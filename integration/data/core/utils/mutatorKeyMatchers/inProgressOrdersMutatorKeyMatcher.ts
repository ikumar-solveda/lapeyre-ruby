/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { DATA_KEY_IN_PROGRESS_ORDERS } from '@/data/constants/dataKey';
import { generateKeyMatcher } from '@/data/utils/generateKeyMatcher';

const keysToMatch: Record<any, boolean> = {
	[DATA_KEY_IN_PROGRESS_ORDERS]: true,
};

export const inProgressOrdersMutatorKeyMatcher = generateKeyMatcher(keysToMatch);
