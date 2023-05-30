/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Layout } from '@/data/types/Layout';

export const getError404Page = (): Layout => ({
	name: 'DoubleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: [{ name: 'Error404', id: 'error-404' }],
		second: [{ name: 'EMarketingSpot', id: 'Home_ProductRec' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
