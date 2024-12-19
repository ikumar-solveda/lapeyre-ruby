/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { LANGUAGE_MAP_LOWERCASE } from '@/data/constants/environment';
import type {
	PageIBMStoreDetails,
	PageIBMStoreDetailsItem,
} from 'integration/generated/transactions/data-contracts';
export type KnownLanguageId = keyof typeof LANGUAGE_MAP_LOWERCASE;
export type KnownLanguageId2URL = Record<KnownLanguageId, string>;

export type SiteMapURL = {
	languageId: KnownLanguageId;
	generateAlternateLanguage: boolean;
	languageId2URLStore: KnownLanguageId2URL;
};

export type StaticPageContainer = PageIBMStoreDetails;
export type StaticPage = PageIBMStoreDetailsItem;
