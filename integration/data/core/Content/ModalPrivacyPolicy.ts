/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useNotifications } from '@/data/Content/Notifications';
import { getESpotDataFromName, useESpotDataFromName } from '@/data/Content/_ESpotDataFromName';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useLocalization } from '@/data/Localization';
import { getLocalization } from '@/data/Localization-Server';
import { dFix, useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import {
	COOKIE_MARKETING_TRACKING_CONSENT,
	COOKIE_PRIVACY_NOTICE_VERSION,
	PRIVACY_POLICY_MODAL_CONTENT,
} from '@/data/constants/privacyPolicy';
import { useCookieState } from '@/data/cookie/useCookieState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { PrivacyPolicy } from '@/data/types/PrivacyPolicy';
import { dataMapContent, dataMapTitleContent } from '@/data/utils/dataMapContent';
import { processError } from '@/data/utils/processError';
import { transactionsPerson } from 'integration/generated/transactions';
import { ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationUpdateRequest } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
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
	await Promise.all([
		getLocalization(cache, context.locale || 'en-US', 'PrivacyPolicy'),
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

	const { data: sessionFeature } = useFlexFlowStoreFeature({ id: EMS_STORE_FEATURE.SESSION });
	const isSession = sessionFeature.featureEnabled;
	const [privacyNoticeVersion, setPrivacyPolicyVersion] = useCookieState<number>(
		COOKIE_PRIVACY_NOTICE_VERSION,
		isSession
	);
	const [_, setMarketingTrackingConsent] = useCookieState<number>(
		COOKIE_MARKETING_TRACKING_CONSENT,
		isSession
	);

	const onSubmit = useCallback(
		async (policy: PrivacyPolicy) => {
			const body = { ...policy, privacyNoticeVersion: privacyNoticeVersionValue };
			setPrivacyPolicyVersion(dFix(privacyNoticeVersionValue));
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
			setPrivacyPolicyVersion,
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
