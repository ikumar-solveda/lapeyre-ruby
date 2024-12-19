/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Layout } from '@/data/types/Layout';

export const getQuoteCreateEditPage = (): Layout => ({
	name: 'Aside',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		aside: [{ name: 'AccountSidebar', id: 'side-bar' }],
		second: [{ name: 'QuoteCreateEdit', id: 'quote-create-edit' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
