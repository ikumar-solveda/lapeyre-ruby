/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { GTMItemListViewPayload } from '@/data/types/GTM';

export const getGTMItemListViewEventData = async (payload: GTMItemListViewPayload) => {
	const { products, listPageName, listId, storeName } = payload;
	products.forEach((product, index) => {
		product.position = index;
	});
	return {
		products,
		listPageName,
		listId,
		storeName,
	};
};
