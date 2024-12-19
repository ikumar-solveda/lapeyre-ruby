/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Layout } from '@/data/types/Layout';

export const getQuoteDetailsPage = (): Layout => ({
	name: 'DoubleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: [],
		second: [{ name: 'QuoteDetails', id: 'quote-details' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
