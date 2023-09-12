/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { CHECKOUT } from '@/data/constants/gtm';
import { GTMCheckoutPageViewPayload } from '@/data/types/GTM';

export const getGTMCheckoutPageViewEventData = async (payload: GTMCheckoutPageViewPayload) => {
	const {
		pageTitle = '',
		pageSubCategory,
		userId,
		isLoggedIn,
		pagePath,
		orgId,
		orgName,
		storeName,
		cart,
		contextData,
	} = payload;
	const { orderItem: items = [] } = cart;
	const hcl_account = orgId ? orgName : null;
	const mpSellers = items.some(({ orderItemId }) => contextData?.[orderItemId]?.product?.sellerId); // TODO This should be the Seller Organization name
	const marketplaceStore = mpSellers ? storeName : null;
	return {
		pageTitle,
		pagePath,
		userId,
		isLoggedIn,
		pageCategory: CHECKOUT,
		pageSubCategory,
		hcl_account,
		marketplaceStore,
	};
};
