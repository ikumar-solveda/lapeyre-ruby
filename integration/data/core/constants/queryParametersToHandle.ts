/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PREVIEW_TOKEN_PARAM } from '@/data/constants/preview';

/**
 * The URL parameters that need to be appended to the all the links in the page.
 */
export const queryParametersToHandle = [
	'storeId',
	'storeIdentifier',
	'shopAsUser',
	PREVIEW_TOKEN_PARAM,
] as const;
