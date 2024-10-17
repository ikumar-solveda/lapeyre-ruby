/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getInitState, useInitState } from '@/data/state/provider';
import { SelectedStoreLocator, StoreDetails } from '@/data/types/Store';

const STORE_LOCATOR_BASE = {
	selectedStore: {} as StoreDetails,
};

/** @deprecated */
export const GET_STORE_LOCATOR_BASE_STATE = (key: string): SelectedStoreLocator =>
	getInitState(key, STORE_LOCATOR_BASE);

export const useStoreLocatorBaseState = (key: string): SelectedStoreLocator =>
	useInitState(key, STORE_LOCATOR_BASE);
