/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	DATA_KEY_CART,
	DATA_KEY_CONTRACT,
	DATA_KEY_ORGANIZATION_DESCRIPTIONS,
	DATA_KEY_REQUISITION_LIST,
	DATA_KEY_USER,
} from '@/data/constants/dataKey';
import { generateKeyMatcher } from '@/data/utils/generateKeyMatcher';

const keysToMatch: Record<any, boolean> = {
	[DATA_KEY_CONTRACT]: true,
	[DATA_KEY_ORGANIZATION_DESCRIPTIONS]: true,
	[DATA_KEY_CART]: true,
	[DATA_KEY_USER]: true,
	[DATA_KEY_REQUISITION_LIST]: true,
};

export const organizationContractMutatorKeyMatcher = generateKeyMatcher(keysToMatch);
