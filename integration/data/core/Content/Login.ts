/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { PASSWORD_EXPIRED } from '@/data/constants/errors';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import {
	COOKIE_MARKETING_TRACKING_CONSENT,
	COOKIE_PRIVACY_NOTICE_VERSION,
} from '@/data/constants/privacyPolicy';
import { useCookieState } from '@/data/cookie/useCookieState';
import { useRememberMeState } from '@/data/state/useRememberMeState';
import { ID, TransactionErrorResponse } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { ErrorType } from '@/data/types/Error';
import { isErrorType, processError } from '@/data/utils/processError';
import { transactionsLoginIdentity } from 'integration/generated/transactions';
import {
	ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm,
	ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { useState } from 'react';

export { personMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personMutatorKeyMatcher';
type LoginResponse = ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity & {
	privacyNoticeVersion?: string;
	marketingTrackingConsent?: string;
};
export const loginFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		data: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm,
		params: RequestParams
	) =>
		(await transactionsLoginIdentity(pub).loginIdentityLogin(
			storeId,
			query,
			data,
			params
		)) as LoginResponse;

export type UserLogon = {
	logonId?: string;
	/**
	 * @deprecated do not use.
	 */
	email?: string;
	logonPassword: string;
	rememberMe: boolean;
	logonPasswordNew?: string;
	logonPasswordVerify?: string;
};

export const getLogin = async ({ cache, context }: ContentProps) => {
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'SignIn'),
		getLocalization(cache, context.locale || 'en-US', 'RegistrationB2BLayout'),
	]);
};

export const useLogin = () => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const {
		actions: { setRememberMe },
	} = useRememberMeState();

	const { data: sessionFeature } = useFlexFlowStoreFeature({ id: EMS_STORE_FEATURE.SESSION });
	const isSession = sessionFeature.featureEnabled;
	const [pnv, setPrivacyPolicyVersion] = useCookieState<number>(
		COOKIE_PRIVACY_NOTICE_VERSION,
		isSession
	);
	const [mtc, setMarketingTrackingConsent] = useCookieState<number>(
		COOKIE_MARKETING_TRACKING_CONSENT,
		isSession
	);
	const { notifyError } = useNotifications();
	const [passwordExpired, setPasswordExpired] = useState<(ErrorType & { user: UserLogon }) | null>(
		null
	);

	const loginSubmit = async (props: UserLogon) => {
		const { email = '', logonId: _logonId, rememberMe, ...rest } = props;
		const logonId: string = _logonId || email;
		try {
			const resp = await loginFetcher(true)(
				settings?.storeId ?? '',
				{ rememberMe: props.rememberMe, updateCookies: 'true' },
				{ logonId, ...rest },
				params
			);
			// the response of loginIdentity has privacyNoticeVersion and marketingTrackingConsent if set for the user.
			const { privacyNoticeVersion, marketingTrackingConsent } = resp;
			// if privacyNoticeVersion exists in session, means it is enabled. Set it from user context
			pnv && setPrivacyPolicyVersion(privacyNoticeVersion ? dFix(privacyNoticeVersion) : undefined);
			mtc &&
				setMarketingTrackingConsent(
					marketingTrackingConsent ? dFix(marketingTrackingConsent) : undefined
				);
			setRememberMe(props.rememberMe);
			return resp;
		} catch (e) {
			const error: TransactionErrorResponse | ErrorType = processError(
				e as TransactionErrorResponse
			);
			if (isErrorType(error) && error.error.errorKey === PASSWORD_EXPIRED) {
				setPasswordExpired({ ...error, user: { ...props } });
			} else {
				notifyError(error);
			}
			return error;
		}
	};

	return {
		loginSubmit,
		passwordExpired,
		setPasswordExpired,
	};
};
