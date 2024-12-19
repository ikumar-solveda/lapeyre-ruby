/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Layout } from '@/data/types/Layout';

export const getCouponsPage = (): Layout => ({
	name: 'Aside',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		aside: [{ name: 'AccountSidebar', id: 'side-bar' }],
		second: [{ name: 'Coupons', id: 'coupons' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
