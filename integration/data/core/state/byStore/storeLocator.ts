/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getInitState } from '@/data/state/provider';
import { SelectedStoreLocator, StoreDetails } from '@/data/types/Store';

export const GET_STORE_LOCATOR_BASE_STATE = (key: string): SelectedStoreLocator =>
	getInitState(key, {
		selectedStore: {} as StoreDetails,
	});
