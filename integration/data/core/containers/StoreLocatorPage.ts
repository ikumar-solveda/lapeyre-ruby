/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Layout } from '@/data/types/Layout';

export const getStoreLocatorPage = (): Layout => ({
	name: 'DoubleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: [],
		second: [{ name: 'StoreLocator', id: 'store-locator' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
