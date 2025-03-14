/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { DATA_KEY_IN_PROGRESS_ORDER_DETAILS } from '@/data/constants/dataKey';
import { generateKeyMatcher } from '@/data/utils/generateKeyMatcher';

const keysToMatch: Record<any, boolean> = {
	[DATA_KEY_IN_PROGRESS_ORDER_DETAILS]: true,
};

export const inProgressOrderDetailsMutatorKeyMatcher = generateKeyMatcher(keysToMatch);
