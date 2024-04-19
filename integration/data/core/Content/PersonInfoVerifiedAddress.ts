/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { selfUpdater, UPDATE_USER_REGISTRATION_QUERY_BYPASS_AVS } from '@/data/Content/_Person';
import { useVerifiedAddress } from '@/data/Content/_VerifiedAddress';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import {
	COOKIE_MARKETING_TRACKING_CONSENT,
	COOKIE_PRIVACY_NOTICE_VERSION,
} from '@/data/constants/privacyPolicy';
import { useCookieState } from '@/data/cookie/useCookieState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { EditablePersonInfo, EditablePersonInfoParam } from '@/data/types/Person';
import { personalContactInfoMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personalContactInfoMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { isUndefined } from 'lodash';
import { useCallback, useMemo } from 'react';
import { mutate } from 'swr';

/**
 * Address verify person info
 */
export const usePersonInfoVerifiedAddress = () => {
	const { notifyError, showSuccessMessage } = useNotifications();
	const personalInformationNLS = useLocalization('PersonalInformation');
	const {
		enteredAddress,
		setEnteredAddress,
		verifiedAddresses,
		setVerifiedAddresses,
		handleChange,
		value,
		open,
		onClosePopup,
		handleVerifyAddress,
		verifyCallback,
		setVerifyCallback,
	} = useVerifiedAddress<EditablePersonInfo>();
	const { settings } = useSettings();
	const storeId = settings?.storeId ?? '';
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
	const params = useExtraRequestParameters();

	const dataPayload = useMemo(() => {
		if (enteredAddress) {
			const address =
				value === 0 ? enteredAddress : { ...enteredAddress, ...verifiedAddresses?.at(value - 1) };
			const {
				addressLine1,
				addressLine2,
				marketingTrackingConsent: _consent,
				privacyNoticeVersion: _discard,
				..._address
			} = address;
			const privacyData = {
				...(!isUndefined(_consent) && { marketingTrackingConsent: _consent ? '1' : '0' }),
				...(!isUndefined(privacyNoticeVersion) && { privacyNoticeVersion }),
			};
			return <EditablePersonInfoParam>(<unknown>{
				address1: addressLine1,
				address2: addressLine2 ?? '',
				..._address,
				...privacyData,
			});
		}
		return undefined;
	}, [enteredAddress, privacyNoticeVersion, value, verifiedAddresses]);

	const onUseAddress = useCallback(async () => {
		if (dataPayload) {
			try {
				await selfUpdater(true)(
					storeId,
					UPDATE_USER_REGISTRATION_QUERY_BYPASS_AVS,
					dataPayload,
					params
				);
				mutate(personalContactInfoMutatorKeyMatcher(''), undefined);
				dataPayload.privacyNoticeVersion &&
					setPrivacyPolicyVersion(dFix(dataPayload.privacyNoticeVersion));
				dataPayload.marketingTrackingConsent &&
					setMarketingTrackingConsent(dFix(dataPayload.marketingTrackingConsent));
				verifyCallback && verifyCallback.callback();
				setVerifiedAddresses(undefined);
				setVerifyCallback(undefined);
				showSuccessMessage(personalInformationNLS.UpdateSuccessful.t());
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		}
	}, [
		storeId,
		dataPayload,
		params,
		setPrivacyPolicyVersion,
		setMarketingTrackingConsent,
		verifyCallback,
		setVerifiedAddresses,
		setVerifyCallback,
		showSuccessMessage,
		personalInformationNLS,
		notifyError,
	]);

	return {
		enteredAddress,
		setEnteredAddress,
		verifiedAddresses,
		setVerifiedAddresses,
		handleChange,
		onUseAddress,
		value,
		open,
		onClosePopup,
		handleVerifyAddress,
	};
};
