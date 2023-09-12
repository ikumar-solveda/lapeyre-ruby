/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { dAdd, dFix } from '@/data/Settings';
import { GTMCartViewPayload } from '@/data/types/GTM';
import { getAttrsByIdentifier } from '@/data/utils/mapProductDetailsData';

export const getGTMCartViewEventData = async (payload: GTMCartViewPayload) => {
	const { cart: _cart, storeName, orgName, orgId, contextData } = payload;
	const { orderItem = [], grandTotal = 0, grandTotalCurrency = '' } = _cart;
	const hcl_account = orgId ? orgName : null;
	const cart = { grandTotal, grandTotalCurrency };
	const products = orderItem.map(
		({
			orderItemId,
			partNumber,
			unitPrice,
			quantity,
			currency,
			shipModeCode,
			salesTax,
			shippingTax,
			totalAdjustment,
		}) => {
			const itemContextData = contextData?.[orderItemId];
			const product = itemContextData?.product;
			const category = itemContextData?.category;

			return {
				id: partNumber,
				price: unitPrice,
				quantity: dFix(quantity, 0),
				currency,
				shippingTier: shipModeCode,
				affiliation: undefined, // Seller Organization of the sku that was added - not currently being used by Management Center

				name: product?.name ?? '',
				category: category?.identifier ?? '',
				variant: getAttrsByIdentifier(product?.definingAttributes),
				brand: product?.manufacturer ?? '',

				coupon: '', // can be derived using: adjustment.map(({code}) => code).join(', ')
				tax: dAdd(dFix(salesTax), dFix(shippingTax)),
				discount: totalAdjustment?.value,
			};
		}
	);

	return {
		cart,
		products,
		hcl_account,
		marketplaceStore: storeName,
	};
};
