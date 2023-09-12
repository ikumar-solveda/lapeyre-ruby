/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { GTMPurchasePayload } from '@/data/types/GTM';
import { dAdd, dFix } from '@/data/utils/floatingPoint';

export const getGTMPurchaseEventData = async (payload: GTMPurchasePayload) => {
	const { cart, contextData, storeName, orgName, orgId } = payload;
	const {
		orderItem = [],
		grandTotal: cartValue = 0,
		grandTotalCurrency: cartCurrency = '',
		totalShippingCharge: cartShipping,
		totalSalesTax,
		totalShippingTax,
		orderId,
		totalAdjustment: cartAdjustments,
	} = cart;
	const hcl_account = orgId ? orgName : null;
	const cartTax = `${dAdd(dFix(totalSalesTax ?? 0), dFix(totalShippingTax ?? 0))}`;
	const marketplaceStore = storeName;
	const affiliation = undefined; // This should be the Seller Organization name
	const products = orderItem.map(
		({
			orderItemId,
			partNumber,
			unitPrice,
			quantity,
			currency,
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
				affiliation,

				name: product?.name ?? '',
				category: category?.identifier ?? '',
				brand: product?.manufacturer ?? '',

				// these properties don't exist anywhere in products response or cart response
				coupon: '', // can be derived using: adjustment.map(({code}) => code).join(', ')
				tax: `${dAdd(dFix(salesTax ?? 0), dFix(shippingTax ?? 0))}`,
				discount: totalAdjustment?.value,
			};
		}
	);
	return {
		orderId,
		cartValue,
		cartCurrency,
		cartTax,
		cartShipping,
		cartAdjustments,
		products,
		hcl_account,
		marketplaceStore,
	};
};
