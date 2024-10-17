/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Settings } from '@/data/Settings';
import { REVERSE_LANGUAGE_MAP_LOWERCASE } from '@/data/constants/environment';
import { getStoreLocaleFromSettingsAndNextLocale } from '@/data/utils/getStoreLocaleFromSettingsAndNextLocale';
import { GetServerSidePropsContext } from 'next';

/** @deprecated */
export const getLanguageIdFromContext = (context: GetServerSidePropsContext) => {
	const langId =
		REVERSE_LANGUAGE_MAP_LOWERCASE[context.locale as keyof typeof REVERSE_LANGUAGE_MAP_LOWERCASE];
	return langId;
};

export const getServerSideCommon = (settings: Settings, context: GetServerSidePropsContext) => {
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
		nextLocale: context.locale,
	});
	return {
		storeId,
		defaultCatalogId,
		/** use getCurrencyFromContext to get currency from user context */
		defaultCurrency,
		defaultLanguage,
		langId,
		storeToken,
		storeName,
	};
};
