/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useNotifications } from '@/data/Content/Notifications';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { getLocalization, useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { processError } from '@/data/utils/processError';
import type { ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationUpdateRequest } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsPerson from 'integration/generated/transactions/transactionsPerson';

const resetPasswordFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			responseFormat?: 'xml' | 'json' | undefined;
			action?: 'updateUserRegistration' | undefined;
		},
		data: ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationUpdateRequest,
		params: RequestParams
	) => {
		await transactionsPerson(pub).personUpdatePersonOnUserRegistrationUpdate(
			storeId,
			query,
			data,
			params
		);
	};

type ResetPassword = {
	/**
	 * @deprecated do not use.
	 */
	email?: string;
	logonId?: string; // optional for backward compatibility
	validationCode: string;
	logonPassword: string;
	logonPasswordVerify: string;
};

const initialResetPassword: ResetPassword = {
	email: '',
	logonId: '',
	validationCode: '',
	logonPassword: '',
	logonPasswordVerify: '',
};

export const getResetPassword = async ({ cache, context }: ContentProps) => {
	const { localeName: locale } = await getStoreLocale({ cache, context });
	await getLocalization(cache, locale, 'ResetPassword');
};

export const useResetPassword = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const params = useExtraRequestParameters();
	const { showSuccessMessage, notifyError } = useNotifications();
	const successMessagesNLS = useLocalization('success-message');
	const RouteLocal = useLocalization('Routes');

	const resetPasswordSubmit = async (props: ResetPassword) => {
		const data = <ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationUpdateRequest>{
			resetPassword: 'true',
			logonId: props.logonId || props.email,
			xcred_validationCode: props.validationCode,
			logonPassword: props.logonPassword,
			xcred_logonPasswordVerify: props.logonPasswordVerify,
		};
		try {
			await resetPasswordFetcher(true)(settings?.storeId ?? '', {}, data, params);
			showSuccessMessage(successMessagesNLS.PASSWORD_RESET_SUCCESS.t());
			router.push(RouteLocal.Login.route.t());
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	};

	return {
		resetPasswordSubmit,
		initialResetPassword,
	};
};
