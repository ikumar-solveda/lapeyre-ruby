/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { dFix } from '@/data/Settings';
import { GTMCheckoutPayload } from '@/data/types/GTM';

export const getGTMCheckoutPaymentEventData = async (payload: GTMCheckoutPayload) => {
	const { cart, storeName, orgName, orgId, contextData } = payload;
	const { orderItem: items = [], grandTotal, grandTotalCurrency } = cart;
	const hcl_account = orgId ? orgName : null;
	const marketplaceStore = storeName;
	const affiliation = undefined; // This should be the Seller Organization name
	const products = items.map(
		({ orderItemId, partNumber, unitPrice, quantity, currency, shipModeCode }) => {
			const product = contextData?.[orderItemId]?.product;
			return {
				id: partNumber,
				name: product?.name,
				price: unitPrice,
				quantity: dFix(quantity, 0),
				currency,
				shippingTier: shipModeCode,
				affiliation,
			};
		}
	);

	return {
		products,
		payMethods: cart.paymentInstruction,
		grandTotal,
		grandTotalCurrency,
		marketplaceStore,
		hcl_account,
	};
};
