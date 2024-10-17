/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	DATA_KEY_CHECKOUT_PROFILES,
	DATA_KEY_CONTRACT,
	DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC,
	DATA_KEY_ORDERS_BY_STATUS,
	DATA_KEY_ORGANIZATION_DESCRIPTIONS,
	DATA_KEY_ORGANIZATION_MANAGEMENT,
	DATA_KEY_PAYMENT_INFO,
	DATA_KEY_PERSON,
	DATA_KEY_REQUISITION_LIST,
	DATA_KEY_SHIPPING_INFO,
	DATA_KEY_SUBSCRIPTION,
	DATA_KEY_USER,
	DATA_KEY_WISH_LIST,
} from '@/data/constants/dataKey';
import { generateKeyMatcher } from '@/data/utils/generateKeyMatcher';

const keysToMatch: Record<any, boolean> = {
	[DATA_KEY_USER]: true,
	[DATA_KEY_PERSON]: true,
	[DATA_KEY_SHIPPING_INFO]: true,
	[DATA_KEY_PAYMENT_INFO]: true,
	[DATA_KEY_ORDERS_BY_STATUS]: true,
	[DATA_KEY_WISH_LIST]: true,
	[DATA_KEY_CHECKOUT_PROFILES]: true,
	[DATA_KEY_CONTRACT]: true,
	[DATA_KEY_ORGANIZATION_DESCRIPTIONS]: true,
	[DATA_KEY_REQUISITION_LIST]: true,
	[DATA_KEY_SUBSCRIPTION]: true,
	[DATA_KEY_ORGANIZATION_MANAGEMENT]: true,
	[DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC]: true,
};

export const personMutatorKeyMatcher = generateKeyMatcher(keysToMatch);
