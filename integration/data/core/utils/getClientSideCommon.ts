/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Settings } from '@/data/Settings';
import { REVERSE_LANGUAGE_MAP_LOWERCASE } from '@/data/constants/environment';
import { getStoreLocaleFromSettingsAndNextLocale } from '@/data/utils/getStoreLocaleFromSettingsAndNextLocale';
import { NextRouter } from 'next/router';

/** @deprecated */
export const getLanguageIdFromRouter = (router: NextRouter) => {
	const langId =
		REVERSE_LANGUAGE_MAP_LOWERCASE[router.locale as keyof typeof REVERSE_LANGUAGE_MAP_LOWERCASE];
	return langId;
};

export const getClientSideCommon = (settings: Settings, router: NextRouter) => {
	const {
		storeId = '',
		defaultCatalogId = '',
		defaultCurrency = '',
		defaultLanguage = '',
		storeToken,
		storeName,
	} = settings ?? {};
	const { languageId: langId } = getStoreLocaleFromSettingsAndNextLocale({
		settings,
		nextLocale: router.locale,
	});
	return {
		storeId,
		defaultCatalogId,
		/** use getCurrencyFromContext to currency from user context */
		defaultCurrency,
		defaultLanguage,
		langId,
		storeToken,
		storeName,
	};
};
