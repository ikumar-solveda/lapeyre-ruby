/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { DATA_KEY_LOCALIZATION } from '@/data/constants/dataKey';
import { Cache } from '@/data/types/Cache';
import { getLocalizationProxy } from '@/data/utils/getLocalizationProxy';
import { shrink } from '@/data/utils/keyUtil';
import {
	Translation,
	TranslationTable,
	requestTranslation,
} from 'integration/generated/translations';
import { unstable_serialize as unstableSerialize, unstable_serialize } from 'swr';

export const getLocalization = async (cache: Cache, locale: string, section: string) => {
	const props = { locale, section };
	const key = unstableSerialize([shrink(props), DATA_KEY_LOCALIZATION]);
	const cacheScope = { requestScope: false };
	const value = cache.get(key, cacheScope) || requestTranslation(props);
	cache.set(key, value, cacheScope);
	return value as Promise<Translation>;
};

export const getTypedLocalization = async <S extends keyof TranslationTable>(
	cache: Cache,
	locale: string,
	section: S
): Promise<TranslationTable[S]> => {
	const props = { locale, section };
	const key = unstable_serialize([shrink(props), DATA_KEY_LOCALIZATION]);
	const cacheScope = { requestScope: false };
	const value = cache.get(key, cacheScope);
	if (value) {
		return value;
	} else {
		const raw = await requestTranslation(props);
		const rc = getLocalizationProxy(raw);
		cache.set(key, rc, cacheScope);
		return rc;
	}
};
