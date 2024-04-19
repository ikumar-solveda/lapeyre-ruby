/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Settings } from '@/data/Settings';
import { REVERSE_LANGUAGE_MAP } from '@/data/constants/environment';
import { GetServerSidePropsContext } from 'next';

export const getLanguageIdFromContext = (context: GetServerSidePropsContext) => {
	const langId = REVERSE_LANGUAGE_MAP[context.locale as keyof typeof REVERSE_LANGUAGE_MAP];
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
	const langId = getLanguageIdFromContext(context);
	return {
		storeId,
		defaultCatalogId,
		defaultCurrency,
		defaultLanguage,
		langId,
		storeToken,
		storeName,
	};
};
