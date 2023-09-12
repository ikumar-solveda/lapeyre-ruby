/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { CART, LOGGED_IN, LOGGED_OUT } from '@/data/constants/gtm';
import { GTMCartPageViewPayload } from '@/data/types/GTM';

export const getGTMCartPageViewEventData = async (payload: GTMCartPageViewPayload) => {
	const {
		pagePath,
		orgId,
		orgName,
		storeName,
		isLoggedIn,
		userId,
		pageSubCategory = '',
		listerResults = '',
	} = payload;
	const login = isLoggedIn ? LOGGED_IN : LOGGED_OUT;
	const hcl_account = orgId ? orgName : null;
	return {
		pageTitle: storeName,
		pagePath,
		pageCategory: CART,
		pageSubCategory,
		userID: userId,
		login,
		hcl_account,
		listerResults,
	};
};
