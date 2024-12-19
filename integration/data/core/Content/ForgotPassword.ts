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

export const forgotPasswordFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			responseFormat?: 'xml' | 'json' | undefined;
			action?: 'updateUserRegistration' | undefined;
		},
		data: ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationUpdateRequest,
		params: RequestParams
	) =>
		await transactionsPerson(pub).personUpdatePersonOnUserRegistrationUpdate(
			storeId,
			query,
			data,
			params
		);

type ForgotPassword = {
	/**
	 * @deprecated do not use
	 */
	email?: string;
	logonId?: string;
};

const initialForgotPassword: ForgotPassword = {
	logonId: '',
	email: '',
};
export const getForgotPassword = async ({ cache, context }: ContentProps) => {
	const { localeName: locale } = await getStoreLocale({ cache, context });
	await getLocalization(cache, locale, 'ForgotPassword');
};

export const useForgotPassword = () => {
	const { settings } = useSettings();
	const RouteLocal = useLocalization('Routes');
	const successMessagesNLS = useLocalization('success-message');
	const router = useNextRouter();
	const params = useExtraRequestParameters();
	const { showSuccessMessage, notifyError } = useNotifications();

	const forgotPasswordSubmit = async (props: ForgotPassword) => {
		const data = {
			logonId: props.logonId || props.email, // for backward compatibility
			resetPassword: 'true',
			challengeAnswer: '-',
		};
		try {
			await forgotPasswordFetcher(true)(settings?.storeId ?? '', {}, data, params);
			showSuccessMessage(successMessagesNLS.RESEND_VERIFICATION_CODE.t());
			router.push({
				pathname: RouteLocal.ResetPassword.route.t(),
				query: { ...(props.logonId ? { logonId: props.logonId } : { email: props.email }) },
			});
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	};

	return {
		initialForgotPassword,
		forgotPasswordSubmit,
	};
};
