/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { dFix } from '@/data/Settings';
import { GTMRemoveFromCartPayload } from '@/data/types/GTM';

export const getGTMRemoveFromCartEventData = async (payload: GTMRemoveFromCartPayload) => {
	const { name, partNumber, currency = '', price, quantity, storeName, orgName, orgId } = payload;
	const hcl_account = orgId ? orgName : null;
	const marketplaceStore = storeName;
	const affiliation = undefined; // This should be the Seller Organization name
	const product = {
		id: partNumber,
		name,
		partNumber,
		price: dFix(price),
		quantity: dFix(quantity, 0),
		currency,
		hcl_account,
		affiliation,
		marketplaceStore,
	};

	return product;
};
