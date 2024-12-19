/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { usePrivacyAndMarketing } from '@/data/Content/PrivacyAndMarketing';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { selfUpdater, UPDATE_USER_REGISTRATION_QUERY_BYPASS_AVS } from '@/data/Content/_Person';
import { useVerifiedAddress } from '@/data/Content/_VerifiedAddress';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
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
	const { privacyNoticeVersion, setMarketingTrackingConsent, setPrivacyNoticeVersion } =
		usePrivacyAndMarketing();
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
					setPrivacyNoticeVersion(dFix(dataPayload.privacyNoticeVersion));
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
		dataPayload,
		storeId,
		params,
		setPrivacyNoticeVersion,
		setMarketingTrackingConsent,
		verifyCallback,
		setVerifiedAddresses,
		setVerifyCallback,
		showSuccessMessage,
		personalInformationNLS.UpdateSuccessful,
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
