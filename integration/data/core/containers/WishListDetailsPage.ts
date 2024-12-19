/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Layout } from '@/data/types/Layout';

export const getWishListDetailsPage = (): Layout => ({
	name: 'Aside',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		aside: [{ name: 'AccountSidebar', id: 'side-bar' }],
		second: [{ name: 'WishListDetails', id: 'wish-list-details' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
