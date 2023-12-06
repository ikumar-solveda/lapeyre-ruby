/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PREVIEW_TOKEN_PARAM } from '@/data/constants/preview';
import { SHOP_AS_USER_PARAM } from '@/data/constants/shopAs';

/**
 * The URL parameters that need to be appended to the all the links in the page.
 */
export const queryParametersToHandle = [
	'storeId',
	'storeIdentifier',
	SHOP_AS_USER_PARAM,
	PREVIEW_TOKEN_PARAM,
] as const;
