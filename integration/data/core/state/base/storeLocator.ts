/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { STORE_LOCATOR_STATE_KEY } from '@/data/constants/storeLocator';
import { getInitState } from '@/data/state/provider';
import { SelectedStoreLocator, StoreDetails } from '@/data/types/Store';

export const STORE_LOCATOR_BASE_STATE: SelectedStoreLocator = getInitState(
	STORE_LOCATOR_STATE_KEY,
	{
		selectedStore: {} as StoreDetails,
	}
);
