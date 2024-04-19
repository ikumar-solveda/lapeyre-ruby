/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IncomingContent } from '@/data/types/IncomingContent';
import { Layout } from '@/data/types/Layout';

export const getQuickOrderPage = (_props: IncomingContent): Layout => ({
	name: 'DoubleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: [],
		second: [{ name: 'QuickOrder', id: 'quick-order' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
