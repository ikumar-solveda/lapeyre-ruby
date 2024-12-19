/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { usePrivacyAndMarketing } from '@/data/Content/PrivacyAndMarketing';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { getESpotDataFromName, useESpotDataFromName } from '@/data/Content/_ESpotDataFromName';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useLocalization } from '@/data/Localization';
import { getLocalization } from '@/data/Localization-Server';
import { dFix, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { PRIVACY_POLICY_MODAL_CONTENT } from '@/data/constants/privacyPolicy';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { PrivacyPolicy } from '@/data/types/PrivacyPolicy';
import { dataMapContent, dataMapTitleContent } from '@/data/utils/dataMapContent';
import { processError } from '@/data/utils/processError';
import type { ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationUpdateRequest } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsPerson from 'integration/generated/transactions/transactionsPerson';
import { useCallback, useMemo } from 'react';

export const privacyPolicyUpdater =
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

export const getModalPrivacyPolicy = async ({ cache, context }: Omit<ContentProps, 'id'>) => {
	const { localeName: locale } = await getStoreLocale({ cache, context });
	await Promise.all([
		getLocalization(cache, locale, 'PrivacyPolicy'),
		getESpotDataFromName(cache, PRIVACY_POLICY_MODAL_CONTENT, context),
	]);
};

export const useModalPrivacyPolicy = () => {
	const { settings } = useSettings();
	const storeId = settings?.storeId;
	const params = useExtraRequestParameters();
	const { data: _data, error, loading } = useESpotDataFromName(PRIVACY_POLICY_MODAL_CONTENT);
	const data = useMemo(() => dataMapContent(_data), [_data]);
	const title = useMemo(() => dataMapTitleContent(_data), [_data]);
	const successMessagesNLS = useLocalization('success-message');
	const successMessage = successMessagesNLS.PRIVACY_POLICY_ACCEPTED.t();
	const { showSuccessMessage, notifyError } = useNotifications();
	const { user } = useUser();
	const loggedIn = user?.isLoggedIn;
	const contentName = data?.[0].contentName ?? '';
	const privacyNoticeVersionValue = contentName.substring(contentName?.search(/\d/));
	const { privacyNoticeVersion, setMarketingTrackingConsent, setPrivacyNoticeVersion } =
		usePrivacyAndMarketing();

	const onSubmit = useCallback(
		async (policy: PrivacyPolicy) => {
			const body = { ...policy, privacyNoticeVersion: privacyNoticeVersionValue };
			setPrivacyNoticeVersion(dFix(privacyNoticeVersionValue));
			policy.marketingTrackingConsent &&
				setMarketingTrackingConsent(dFix(policy.marketingTrackingConsent));

			if (loggedIn) {
				try {
					await privacyPolicyUpdater(true)(storeId ?? '', {}, body, params);
					showSuccessMessage(successMessage);
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			}
		},
		[
			privacyNoticeVersionValue,
			setPrivacyNoticeVersion,
			setMarketingTrackingConsent,
			loggedIn,
			storeId,
			params,
			showSuccessMessage,
			successMessage,
			notifyError,
		]
	);
	return {
		data,
		title,
		loading,
		error,
		onSubmit,
		privacyNoticeVersion,
		privacyNoticeVersionValue,
	};
};
