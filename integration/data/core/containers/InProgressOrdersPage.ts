/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { Layout } from '@/data/types/Layout';

export const getInProgressOrdersPage = (): Layout => ({
	name: 'Aside',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		aside: [{ name: 'AccountSidebar', id: 'side-bar' }],
		second: [{ name: 'InProgressOrders', id: 'in-progress-orders' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
