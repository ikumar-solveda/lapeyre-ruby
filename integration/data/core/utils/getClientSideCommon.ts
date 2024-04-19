/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Settings } from '@/data/Settings';
import { REVERSE_LANGUAGE_MAP } from '@/data/constants/environment';
import { NextRouter } from 'next/router';

export const getLanguageIdFromRouter = (router: NextRouter) => {
	const langId = REVERSE_LANGUAGE_MAP[router.locale as keyof typeof REVERSE_LANGUAGE_MAP];
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
	const langId = getLanguageIdFromRouter(router);
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
