/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useStoreLocale } from '@/data/Content/StoreLocale';
import { getLocalization } from '@/data/Localization-Server';
import { DATA_KEY_LOCALIZATION } from '@/data/constants/dataKey';
import { ErrorType } from '@/data/types/Error';
import { getLocalizationProxy } from '@/data/utils/getLocalizationProxy';
import { expand, shrink } from '@/data/utils/keyUtil';
import { TranslationTable, requestTranslation } from 'integration/generated/translations';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';
export { getLocalization };
const DATA_KEY = DATA_KEY_LOCALIZATION;

export const useLocalizationForLocale = <S extends keyof TranslationTable>(
	section: S,
	locale?: string
) => {
	const { data } = useSWR(
		locale
			? [
					shrink({
						locale,
						section,
					}),
					DATA_KEY,
			  ]
			: null,
		async ([props]) => requestTranslation(expand(props))
	);
	return useMemo((): TranslationTable[S] => getLocalizationProxy(data), [data]);
};

export const useLocalization = <S extends keyof TranslationTable>(section: S) => {
	const { localeName: locale } = useStoreLocale();
	return useLocalizationForLocale(section, locale);
};

export const useLocalizedErrorMessage = () => {
	const errorsNLS = useLocalization('error-message');
	type errorNLSKeys = keyof typeof errorsNLS;
	type ArgTypes = string | number;
	const getLocalizedErrorMessage = useCallback(
		(error: ErrorType) => {
			const messageKey = error.messageKey as errorNLSKeys;
			const errorParameters: [ArgTypes, ArgTypes, ArgTypes, ...ArgTypes[]] = ['', '', ''];
			const messageParameters = error.errorParameters;
			if (messageParameters && messageParameters.length > 0) {
				errorParameters.splice(0, messageParameters.length, ...messageParameters);
			}
			return error.messageKey in errorsNLS
				? errorsNLS[messageKey].t(errorParameters)
				: error.errorMessage ?? '';
		},
		[errorsNLS]
	);

	return getLocalizedErrorMessage;
};
