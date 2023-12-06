/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DATA_KEY_SHIPPING_INFO } from '@/data/constants/dataKey';
import { generateKeyMatcher } from '@/data/utils/generateKeyMatcher';

const keysToMatch: Record<any, boolean> = {
	[DATA_KEY_SHIPPING_INFO]: true,
};

export const usableShippingInfoMutatorKeyMatcher = generateKeyMatcher(keysToMatch);
