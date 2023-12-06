/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Layout } from '@/data/types/Layout';

export const getAdminOrderApprovalDetailsPage = (): Layout => ({
	name: 'DoubleStack',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		first: [],
		second: [{ name: 'AdminOrderApprovalDetails', id: 'order-approval-details' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
