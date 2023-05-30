/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Layout } from '@/data/types/Layout';

export const getSearchPage = (): Layout => ({
	name: 'Aside',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: [],
		aside: [
			{
				id: '',
				name: 'FacetNavigation',
			},
		],
		second: [
			{
				id: '',
				name: 'CatalogEntryList',
			},
		],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
