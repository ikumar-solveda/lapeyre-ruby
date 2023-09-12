/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { ID, TransactionErrorResponse } from '@/data/types/Basic';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { transactionsLoginIdentity } from 'integration/generated/transactions';
import { ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm } from 'integration/generated/transactions/data-contracts';
import { isErrorType, processError } from '@/data/utils/processError';
import { useNotifications } from '@/data/Content/Notifications';
import { ErrorType } from '@/data/types/Error';
import { PASSWORD_EXPIRED } from '@/data/constants/errors';
import { useState } from 'react';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getLocalization } from '@/data/Localization';
import { ContentProps } from '@/data/types/ContentProps';

export { personMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personMutatorKeyMatcher';

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
		await transactionsLoginIdentity(pub).loginIdentityLogin(storeId, query, data, params);

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
