/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { useCartSWRKey } from '@/data/Content/Cart';
import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useNotifications } from '@/data/Content/Notifications';
import { usePrivacyAndMarketing } from '@/data/Content/PrivacyAndMarketing';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC } from '@/data/constants/dataKey';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { EventsContext } from '@/data/context/events';
import { useRememberMeState } from '@/data/state/useRememberMeState';
import { ID, TransactionErrorResponse } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { personMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import type { ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsPerson from 'integration/generated/transactions/transactionsPerson';
import { isUndefined } from 'lodash';
import { useCallback, useContext, useMemo } from 'react';
import { useSWRConfig } from 'swr';

const registrationFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		data: ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest,
		params: RequestParams
	) =>
		await transactionsPerson(pub).personRegisterPersonOnUserRegistrationAdminAdd(
			storeId,
			query,
			data,
			params
		);

type UserRegistration = {
	logonId?: string; // optional for backward compatibility
	/**
	 * @deprecated do not use.
	 */
	email?: string;
	phone1?: string;
	firstName: string;
	lastName: string;
	logonPassword: string;
	logonPasswordVerify: string;
	receiveEmail: boolean;
	rememberMe: boolean;
	marketingTrackingConsent?: boolean;
};

const initialRegistrationValue: UserRegistration = {
	logonId: '',
	email: '',
	firstName: '',
	lastName: '',
	logonPassword: '',
	logonPasswordVerify: '',
	phone1: '',
	receiveEmail: false,
	rememberMe: false,
};

export const getRegistration = async ({ cache, context }: ContentProps) => {
	const { localeName: locale } = await getStoreLocale({ cache, context });
	await getLocalization(cache, locale, 'RegistrationLayout');
};

export const useRegistration = () => {
	const { onLogin } = useContext(EventsContext);
	const { settings } = useSettings();
	const { mutate } = useSWRConfig();
	const router = useNextRouter();
	const params = useExtraRequestParameters();
	const { notifyError } = useNotifications();
	const {
		actions: { setRememberMe },
	} = useRememberMeState();
	const { langId: preferredLanguage } = getClientSideCommon(settings, router);
	const { data: _consentFeature } = useFlexFlowStoreFeature({
		id: EMS_STORE_FEATURE.CONSENT_OPTIONS,
	});
	const { featureEnabled: consentFeature } = _consentFeature;
	const { user } = useUser();
	const initialRegistration = useMemo(
		() =>
			consentFeature
				? { ...initialRegistrationValue, marketingTrackingConsent: false }
				: { ...initialRegistrationValue },
		[consentFeature]
	);

	const { privacyNoticeVersion, setMarketingTrackingConsent, setPrivacyNoticeVersion } =
		usePrivacyAndMarketing();

	const currentCartSWRKey = useCartSWRKey(); // in current language

	const registrationSubmit = useCallback(
		async (props: UserRegistration) => {
			const {
				rememberMe,
				receiveEmail,
				email,
				logonId,
				marketingTrackingConsent: _consent,
				...rest
			} = props;
			const privacyData = {
				...(!isUndefined(_consent) && { marketingTrackingConsent: _consent ? '1' : '0' }),
				...(!isUndefined(privacyNoticeVersion) && {
					privacyNoticeVersion: String(privacyNoticeVersion),
				}),
			};

			const data = <ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest>{
				...rest,
				logonId: logonId || email, // backward compatibility, if logonId is empty string or undefined use email value
				email1: email,
				receiveEmail: receiveEmail.toString(),
				preferredLanguage,
				profileType: 'C',
				challengeQuestion: '-',
				challengeAnswer: '-',
				receiveEmailPreference: [
					{ value: receiveEmail.toString(), storeId: settings?.storeId ?? '' },
				],
			};

			try {
				const userRegistrationData = await registrationFetcher(true)(
					settings?.storeId ?? '',
					{ rememberMe, updateCookies: 'true' },
					{ ...data, ...privacyData },
					params
				);
				setRememberMe(rememberMe);
				privacyData.privacyNoticeVersion &&
					setPrivacyNoticeVersion(dFix(privacyData.privacyNoticeVersion));
				privacyData.marketingTrackingConsent &&
					setMarketingTrackingConsent(dFix(privacyData.marketingTrackingConsent));
				onLogin({ gtm: { settings, oldUserData: user?.context, userRegistrationData } }); // this counts as a login
				await router.push('/');
				await mutate(personMutatorKeyMatcher(EMPTY_STRING)); // current page
				await mutate(personMutatorKeyMatcher(DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC), undefined);
				await mutate(cartMutatorKeyMatcher('')); // at current page
				await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // all cart except current cart, e.g different locale
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			currentCartSWRKey,
			mutate,
			notifyError,
			onLogin,
			params,
			preferredLanguage,
			privacyNoticeVersion,
			router,
			setMarketingTrackingConsent,
			setPrivacyNoticeVersion,
			setRememberMe,
			settings,
			user?.context,
		]
	);

	return {
		registrationSubmit,
		initialRegistration,
	};
};
