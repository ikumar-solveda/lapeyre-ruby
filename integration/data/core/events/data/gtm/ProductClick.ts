/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { GTMProductClickPayload } from '@/data/types/GTM';

export const getGTMProductClickEventData = async (payload: GTMProductClickPayload) => {
	const { product, listerFlag, storeName, listId, listName } = payload;
	const { partNumber, name, productPrice, manufacturer } = product;
	const currency = productPrice?.currency ?? '';
	const marketplaceStore = storeName;
	const affiliation = undefined; // This should be the Seller Organization name
	const products = [
		{
			id: partNumber,
			name,
			price: productPrice?.offer,
			category: '', // not used
			list: listerFlag ? 'Category' : 'Search Results',
			currency: productPrice.currency,
			brand: manufacturer,
			affiliation,
			// Do we need these parameters?
			position: undefined,
		},
	];
	return { products, currencyCode: currency, marketplaceStore, listId, listName };
};
