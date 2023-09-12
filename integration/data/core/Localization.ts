/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useNextRouter } from '@/data/Content/_NextRouter';
import { Cache } from '@/data/types/Cache';
import { ErrorType } from '@/data/types/Error';
import { getLocalizationProxy } from '@/data/utils/getLocalizationProxy';
import { expand, shrink } from '@/data/utils/keyUtil';
import { TranslationTable, requestTranslation } from 'integration/generated/translations';
import { useCallback, useMemo } from 'react';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

const DATA_KEY = 'Localization';

export const getLocalization = async (cache: Cache, locale: string, section: string) => {
	const props = {
		locale,
		section,
	};
	const key = unstableSerialize([shrink(props), DATA_KEY]);
	const cacheScope = { requestScope: false };
	const value = cache.get(key, cacheScope) || requestTranslation(props);
	cache.set(key, value, cacheScope);
	return value;
};

export const useLocalization = <S extends keyof TranslationTable>(section: S) => {
	const { locale } = useNextRouter();
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
