/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Layout } from '@/data/types/Layout';

export const getError500Page = (): Layout => ({
	name: 'DoubleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: [{ name: 'Error500', id: 'error-500' }],
		second: [],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
