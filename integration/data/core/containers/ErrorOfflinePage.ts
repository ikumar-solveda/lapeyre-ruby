/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2025.
 */

import { Layout } from '@/data/types/Layout';

export const getErrorOfflinePage = (): Layout => ({
	name: 'DoubleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: [],
		second: [{ name: 'ErrorOffline', id: 'error-offline' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
