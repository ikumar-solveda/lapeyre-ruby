/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Settings } from '@/data/Settings';
import { CATALOG_ID } from '@/data/config/CATALOG_ID';
import { INVENTORY_SYSTEM } from '@/data/config/INVENTORY_SYSTEM';
import { STORE_ID } from '@/data/config/STORE_ID';
import { STORE_IDENTIFIER } from '@/data/config/STORE_IDENTIFIER';
import { PageDataFromId } from '@/data/types/PageDataFromId';
import { switchOnMock } from '@/data/utils/switchOnMock';

export const HEADLESS_STORE_STORE_CONTEXT_ROOT = 'headlessStore.storeContextRoot';
export const DEFAULT_LANGUAGE = '-1';
export const DEFAULT_LOCALE = 'en-US';
export const DEFAULT_CURRENCY = 'USD';
export const DEFAULT_META = {
	title: 'Ruby',
	description: 'A store for the ages.',
	keywords: 'react store',
};
export const DEFAULT_ERROR_META = {
	title: 'Default Generic Error',
	description: 'Default Generic Error',
	keywords: 'error, generic error, internal server error, 500',
};
export const DEFAULT_PAGE_DATA: PageDataFromId = {
	layout: { containerName: 'default', slots: [] },
	page: {
		type: '404',
		title: 'Page not found',
		metaDescription: 'Page not found',
		metaKeyword: '',
	},
	identifier: '',
	tokenExternalValue: '',
	tokenName: '',
	tokenValue: '',
};
export const DEFAULT_LAYOUT = {
	name: 'DoubleStack' as const,
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: [],
		second: [],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
};

const INITIAL_SETTINGS_BASE = {
	supportedCurrencies: [DEFAULT_CURRENCY],
	defaultCurrency: DEFAULT_CURRENCY,
	supportedLanguages: [DEFAULT_LANGUAGE],
	defaultLanguage: DEFAULT_LANGUAGE,
	defaultCatalogId: CATALOG_ID,
	inventorySystem: INVENTORY_SYSTEM,
	currencySymbol: '$',
	storeId: STORE_ID,
	storeName: STORE_IDENTIFIER,
	identifier: STORE_IDENTIFIER,
	userData: { [HEADLESS_STORE_STORE_CONTEXT_ROOT]: STORE_IDENTIFIER },
	csrSession: false,
	relatedStores: [],
	mapApiKey: process.env.MAP_API_KEY ?? '',
};

const mockContext = {
	globalization: {
		preferredCurrency: 'USD',
		languageId: -1,
		currency: 'USD',
		preferredLanguageId: -1,
	},
	catalog: {
		catalogId: 11501,
		masterCatalog: false,
	},
	bcsversion: {
		lastUpdateTime: null,
	},
	resourceName: 'usercontext',
	entitlement: {
		eligibleTradingAgreementIds: [-11005],
		hostingContractId: -11004,
		currentTradingAgreementIds: [-11005],
		activeOrganizationId: -2000,
		sessionTradingAgreementIds: null,
	},
	isPartiallyAuthenticated: false,
	basicInfo: {
		runAsId: -1002,
		callerId: -1002,
		registerType: 'G',
		storeId: 11,
		channelId: -1,
	},
};

export const INITIAL_SETTINGS = switchOnMock<Settings>({
	value: INITIAL_SETTINGS_BASE,
	mockValue: { ...INITIAL_SETTINGS_BASE, state: 'open', context: mockContext, error: false },
});
