/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { GTMAddToCartPayload } from '@/data/types/GTM';

export const getGTMAddToCartEventData = async (payload: GTMAddToCartPayload) => {
	const { selection, quantity, storeName, orgName, orgId, category } = payload;
	const { sku } = selection;
	const { id, name, partNumber, type, manufacturer, productPrice } = sku ?? {};
	const currency = productPrice?.currency ?? '';
	const hcl_account = orgId ? orgName : null;
	const marketplaceStore = storeName;
	const value = productPrice?.offer;
	const affiliation = undefined; // This will later be the Marketplace Seller's organization name
	const products = [
		{
			id,
			name,
			partNumber,
			type,
			quantity,
			manufacturer,
			currency,
			price: productPrice?.offer,
			category: category?.identifier,
			variant: selection.attrsByIdentifier,
			affiliation,
		},
	];
	return { products, currencyCode: currency, marketplaceStore, hcl_account, value };
};
