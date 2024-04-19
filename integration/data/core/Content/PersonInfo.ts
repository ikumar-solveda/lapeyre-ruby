/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { selfFetcher, selfUpdater, UPDATE_USER_REGISTRATION_QUERY } from '@/data/Content/_Person';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { DATA_KEY_PERSON } from '@/data/constants/dataKey';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import {
	COOKIE_MARKETING_TRACKING_CONSENT,
	COOKIE_PRIVACY_NOTICE_VERSION,
	MARKETING_TRACKING_CONSENT_KEY,
	PRIVACY_NOTICE_VERSION_KEY,
} from '@/data/constants/privacyPolicy';
import { useCookieState } from '@/data/cookie/useCookieState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import {
	EditablePersonInfo,
	EditablePersonInfoParam,
	Person,
	PersonContact,
} from '@/data/types/Person';
import { isMappedAddressInfoArray } from '@/data/utils/contact';
import { personalContactInfoMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personalContactInfoMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { isUndefined } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

export type { EditablePersonInfo, EditablePersonInfoParam };

export type ChangePasswordValues = {
	xcred_logonPasswordOld: string;
	logonPassword: string;
	xcred_logonPasswordVerify: string;
};

const dataMap = (data?: Person, storeId?: string): EditablePersonInfo => {
	const {
		firstName = '',
		lastName = '',
		email1 = '',
		addressLine = ['', ''],
		city = '',
		country = '',
		state = '',
		zipCode = '',
		phone1 = '',
		orgizationId: parentOrgId,
	} = data ?? {};
	const marketingTrackingConsentValue = data?.contextAttribute
		?.find((attribute) => attribute.attributeName === MARKETING_TRACKING_CONSENT_KEY)
		?.attributeValue?.find((value) => value.storeId === storeId)?.value[0];
	return {
		firstName,
		lastName,
		email1,
		addressLine1: addressLine[0] ?? '',
		addressLine2: addressLine[1] ?? '',
		city,
		country,
		state,
		zipCode,
		phone1,
		parentOrgId,
		privacyNoticeVersion: data?.contextAttribute
			?.find((attribute) => attribute.attributeName === PRIVACY_NOTICE_VERSION_KEY)
			?.attributeValue?.find((value) => value.storeId === storeId)?.value[0],
		...(marketingTrackingConsentValue && {
			marketingTrackingConsent: marketingTrackingConsentValue === '1',
		}),
	};
};

export const usePersonInfo = () => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const personalInformationNLS = useLocalization('PersonalInformation');
	const { showSuccessMessage, notifyError } = useNotifications();
	const [editing, setEditing] = useState(false);
	const [changePassword, setChangePassword] = useState(false);
	const { data: _marketingConsent } = useFlexFlowStoreFeature({
		id: EMS_STORE_FEATURE.MARKETING_CONSENT,
	});
	const { featureEnabled: marketingConsentFeature } = _marketingConsent;

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

	const {
		data,
		error: personInfoError,
		mutate: mutatePersonInfo,
	} = useSWR(
		settings?.storeId
			? [
					{
						storeId: settings.storeId,
					},
					DATA_KEY_PERSON,
			  ]
			: null,
		async ([props]) => selfFetcher(true)(props.storeId, undefined, params)
	);

	const edit = useCallback(() => {
		setEditing(true);
	}, []);

	const cancelEdit = useCallback(async () => {
		setEditing(false);
	}, []);

	const savePersonInfo = useCallback(
		async (info: EditablePersonInfo) => {
			const {
				addressLine1,
				addressLine2,
				marketingTrackingConsent: _consent,
				privacyNoticeVersion: _discard,
				..._address
			} = info;
			const privacyData = {
				...(!isUndefined(_consent) && { marketingTrackingConsent: _consent ? '1' : '0' }),
				...(!isUndefined(privacyNoticeVersion) && { privacyNoticeVersion }),
			};
			const data = <EditablePersonInfoParam>{
				address1: addressLine1,
				address2: addressLine2 ?? '',
				..._address,
				...privacyData,
			};
			const storeId = settings?.storeId ?? '';
			try {
				const resp = await selfUpdater(true)(storeId, UPDATE_USER_REGISTRATION_QUERY, data, params);
				if (isMappedAddressInfoArray(resp)) {
					return {
						validatedAddresses: resp,
						editingAddress: info,
						callback: cancelEdit,
					};
				}
				mutate(personalContactInfoMutatorKeyMatcher(''), undefined);
				setEditing(false);
				privacyData.privacyNoticeVersion &&
					setPrivacyPolicyVersion(dFix(privacyData.privacyNoticeVersion));
				privacyData.marketingTrackingConsent &&
					setMarketingTrackingConsent(dFix(privacyData.marketingTrackingConsent));
				showSuccessMessage(personalInformationNLS.UpdateSuccessful.t());
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			privacyNoticeVersion,
			settings?.storeId,
			params,
			setPrivacyPolicyVersion,
			setMarketingTrackingConsent,
			showSuccessMessage,
			personalInformationNLS.UpdateSuccessful,
			cancelEdit,
			notifyError,
		]
	);

	const closePasswordDialog = useCallback(() => {
		setChangePassword(false);
	}, []);

	const openPasswordDialog = useCallback(() => {
		setChangePassword(true);
	}, []);

	const updatePassword = useCallback(
		async (value: ChangePasswordValues) => {
			const data = { resetPassword: 'true', ...value };
			const storeId = settings?.storeId ?? '';
			try {
				await selfUpdater(true)(storeId, undefined, data, params);
				setChangePassword(false);
				showSuccessMessage(personalInformationNLS.UpdateSuccessful.t());
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			notifyError,
			personalInformationNLS.UpdateSuccessful,
			settings?.storeId,
			showSuccessMessage,
			params,
		]
	);

	const { personInfo, primaryAddress } = useMemo(() => {
		const personInfo = dataMap(data, settings?.storeId);
		if (marketingConsentFeature && personInfo.marketingTrackingConsent === undefined) {
			personInfo.marketingTrackingConsent = false;
		}
		const { nickName, addressLine, addressType, addressId } = data ?? {};
		const primaryAddress = nickName
			? ({
					...personInfo,
					addressId,
					addressLine,
					nickName,
					addressType,
					primary: 'true',
			  } as PersonContact)
			: undefined;
		return { personInfo, primaryAddress };
	}, [marketingConsentFeature, data, settings?.storeId]);

	return {
		personInfo,
		primaryAddress,
		mutatePersonInfo,
		personInfoError,
		editing,
		edit,
		cancelEdit,
		savePersonInfo,
		updatePassword,
		closePasswordDialog,
		openPasswordDialog,
		changePassword,
	};
};
