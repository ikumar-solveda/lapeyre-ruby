/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { transactionsPerson } from 'integration/generated/transactions';
import { ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationUpdateRequest } from 'integration/generated/transactions/data-contracts';
import { useNotifications } from '@/data/Content/Notifications';
import { getLocalization, useLocalization } from '@/data/Localization';
import { processError } from '@/data/utils/processError';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { ContentProps } from '@/data/types/ContentProps';

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
	email: string;
	validationCode: string;
	logonPassword: string;
	logonPasswordVerify: string;
};

const initialResetPassword: ResetPassword = {
	email: '',
	validationCode: '',
	logonPassword: '',
	logonPasswordVerify: '',
};

export const getResetPassword = async ({ cache, context }: ContentProps) => {
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'ResetPassword'),
		getLocalization(cache, context.locale || 'en-US', 'Routes'),
	]);
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
			logonId: props.email,
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
