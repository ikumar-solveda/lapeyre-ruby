/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC } from '@/data/constants/dataKey';
import { generateKeyMatcher } from '@/data/utils/generateKeyMatcher';

const keysToMatch: Record<any, boolean> = {
	[DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC]: true,
};

export const dynamicESpotMutatorKeyMatcher = generateKeyMatcher(keysToMatch);
