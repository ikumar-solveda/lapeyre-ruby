/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Layout } from '@/data/types/Layout';

export const getWishListsPage = (): Layout => ({
	name: 'Aside',
	slots: {
		header: [{ name: 'Header', id: 'header' }],
		aside: [{ name: 'AccountSidebar', id: 'side-bar' }],
		second: [{ name: 'WishLists', id: 'wish-lists' }],
		footer: [{ name: 'Footer', id: 'footer' }],
	},
});
