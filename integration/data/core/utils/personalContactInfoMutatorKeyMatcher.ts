/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	DATA_KEY_PERSON,
	DATA_KEY_SHIPPING_INFO,
	DATA_KEY_PAYMENT_INFO,
} from '@/data/constants/dataKey';
import { generateKeyMatcher } from '@/data/utils/generateKeyMatcher';

const keysToMatch: Record<any, boolean> = {
	[DATA_KEY_PERSON]: true,
	[DATA_KEY_SHIPPING_INFO]: true,
	[DATA_KEY_PAYMENT_INFO]: true,
};

export const personalContactInfoMutatorKeyMatcher = generateKeyMatcher(keysToMatch);
