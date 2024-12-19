/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature';
import { useNotifications } from '@/data/Content/Notifications';
import { usePathNameByLocale } from '@/data/Content/PathNameByLocale';
import { usePrivacyAndMarketing } from '@/data/Content/PrivacyAndMarketing';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { selfFetcher, selfUpdater, UPDATE_USER_REGISTRATION_QUERY } from '@/data/Content/_Person';
import { useLocalization } from '@/data/Localization';
import { dFix, useSettings } from '@/data/Settings';
import { DATA_KEY_PERSON } from '@/data/constants/dataKey';
import { EMS_STORE_FEATURE } from '@/data/constants/flexFlowStoreFeature';
import {
	MARKETING_TRACKING_CONSENT_KEY,
	PRIVACY_NOTICE_VERSION_KEY,
} from '@/data/constants/privacyPolicy';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { CONFIGURATION_IDS, LanguageConfiguration } from '@/data/types/Configuration';
import {
	EditablePersonInfo,
	EditablePersonInfoParam,
	Person,
	PersonContact,
} from '@/data/types/Person';
import { isMappedAddressInfoArray } from '@/data/utils/contact';
import { personalContactInfoMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/personalContactInfoMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { SelectChangeEvent } from '@mui/material';
import { isUndefined } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

export type { EditablePersonInfo, EditablePersonInfoParam };

export type ChangePasswordValues = {
	xcred_logonPasswordOld: string;
	logonPassword: string;
	xcred_logonPasswordVerify: string;
};

const dataMap = ({
	data,
	storeId,
	supportedLanguages,
}: {
	data?: Person;
	storeId: string;
	supportedLanguages: LanguageConfiguration[];
}): EditablePersonInfo => {
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
		preferredCurrency = '',
		preferredLanguage: preLang = '',
	} = data ?? {};
	const preferredLanguage =
		supportedLanguages.find((lang) => lang.localeName.replace('-', '_') === preLang.toLowerCase())
			?.languageId ?? '';
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
		preferredCurrency,
		preferredLanguage,
		privacyNoticeVersion: data?.contextAttribute
			?.find((attribute) => attribute.attributeName === PRIVACY_NOTICE_VERSION_KEY)
			?.attributeValue?.find((value) => value.storeId === storeId)?.value[0],
		...(marketingTrackingConsentValue && {
			marketingTrackingConsent: marketingTrackingConsentValue === '1',
		}),
	};
};

const emptyConfiguration = [] as LanguageConfiguration[];

export const usePersonInfo = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { query } = router;
	const { path, ...restQuery } = query;
	const {
		storeId = '',
		[CONFIGURATION_IDS.SUPPORTED_LANGUAGES]: supportedLanguages = emptyConfiguration,
	} = settings;
	const params = useExtraRequestParameters();
	const personalInformationNLS = useLocalization('PersonalInformation');
	const { showSuccessMessage, notifyError } = useNotifications();
	const [editing, setEditing] = useState(false);
	const [changePassword, setChangePassword] = useState(false);
	const [selectedLocale, setSelectedLocale] = useState('');
	const { privacyNoticeVersion, setMarketingTrackingConsent, setPrivacyNoticeVersion } =
		usePrivacyAndMarketing();
	const { data: _marketingConsent } = useFlexFlowStoreFeature({
		id: EMS_STORE_FEATURE.MARKETING_CONSENT,
	});
	const { featureEnabled: marketingConsentFeature } = _marketingConsent;

	const {
		data,
		error: personInfoError,
		mutate: mutatePersonInfo,
	} = useSWR(
		storeId
			? [
					{
						storeId,
					},
					DATA_KEY_PERSON,
			  ]
			: null,
		async ([props]) => selfFetcher(true)(props.storeId, undefined, params)
	);
	const personPreferredLocale = (data?.preferredLanguage ?? '').replace('_', '-').toLowerCase();

	const edit = useCallback(() => {
		setEditing(true);
	}, []);

	const cancelEdit = useCallback(async () => {
		setEditing(false);
	}, []);

	const newPathname = usePathNameByLocale({ locale: selectedLocale });

	const changeLocaleIfNeeded = useCallback(async () => {
		if (selectedLocale && selectedLocale !== personPreferredLocale) {
			return await router.push({ pathname: newPathname, query: restQuery }, undefined, {
				locale: selectedLocale,
			});
		}
	}, [newPathname, personPreferredLocale, restQuery, router, selectedLocale]);

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
			try {
				const resp = await selfUpdater(true)(storeId, UPDATE_USER_REGISTRATION_QUERY, data, params);
				if (isMappedAddressInfoArray(resp)) {
					return {
						validatedAddresses: resp,
						editingAddress: info,
						callback: cancelEdit,
					};
				}
				setEditing(false);
				showSuccessMessage(personalInformationNLS.UpdateSuccessful.t());
				privacyData.privacyNoticeVersion &&
					setPrivacyNoticeVersion(dFix(privacyData.privacyNoticeVersion));
				privacyData.marketingTrackingConsent &&
					setMarketingTrackingConsent(dFix(privacyData.marketingTrackingConsent));
				await changeLocaleIfNeeded();
				mutate(personalContactInfoMutatorKeyMatcher(''), undefined);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[
			privacyNoticeVersion,
			storeId,
			params,
			showSuccessMessage,
			personalInformationNLS.UpdateSuccessful,
			setPrivacyNoticeVersion,
			setMarketingTrackingConsent,
			changeLocaleIfNeeded,
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
			try {
				await selfUpdater(true)(storeId, undefined, data, params);
				setChangePassword(false);
				showSuccessMessage(personalInformationNLS.UpdateSuccessful.t());
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[notifyError, personalInformationNLS.UpdateSuccessful, storeId, showSuccessMessage, params]
	);

	const { personInfo, primaryAddress } = useMemo(() => {
		const personInfo = dataMap({ data, storeId, supportedLanguages });
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
	}, [marketingConsentFeature, data, storeId, supportedLanguages]);

	const handlePreferredLanguageSelectChange = useCallback(
		// callback is handleselectchange from useForm
		(callback: (event: SelectChangeEvent) => void) => (event: SelectChangeEvent) => {
			const elm = event.target;
			const { name, value } = elm;
			if (name === 'preferredLanguage' && value !== '') {
				const newLocale =
					supportedLanguages.find((lang) => lang.languageId === value)?.localeName ?? '';
				setSelectedLocale(newLocale);
			}
			return callback(event);
		},
		[supportedLanguages]
	);

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
		handlePreferredLanguageSelectChange,
	};
};
