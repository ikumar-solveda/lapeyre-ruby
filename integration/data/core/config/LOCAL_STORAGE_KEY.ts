/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { STORE_LOCATOR_STATE_KEY } from '@/data/constants/storeLocator';
import { SELECTED_PROFILE } from '@/data/constants/checkoutProfile';
import { LANGUAGE_STATE_KEY } from '@/data/constants/language';

export const LOCAL_STORAGE_KEY = [
	STORE_LOCATOR_STATE_KEY,
	// TODO: remove `SELECTED_PROFILE` post 9.1.14.0
	SELECTED_PROFILE,
	LANGUAGE_STATE_KEY,
];
