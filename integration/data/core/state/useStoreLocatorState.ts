/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { STORE_LOCATOR_STATE_KEY } from '@/data/constants/storeLocator';
import { STORE_LOCATOR_BASE_STATE } from '@/data/state/base/storeLocator';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { SelectedStoreLocator, StoreDetails } from '@/data/types/Store';
import { useCallback } from 'react';

const storeLocatorUpdater = getStateUpdater({
	key: STORE_LOCATOR_STATE_KEY,
	baseState: STORE_LOCATOR_BASE_STATE,
});

/**
 * React hook for use by the presentation layer to read selected store state
 * data and expose event handlers (actions) related to data changes.
 */

export const useStoreLocatorState = () => {
	const setState = useSetState();
	const { storeLocator } = useTrackedState() as {
		storeLocator: SelectedStoreLocator;
	};

	const selectStore = useCallback(
		(storeDetails: StoreDetails) =>
			storeLocatorUpdater({
				setState,
				now: (storeLocator) => ({ ...storeLocator, selectedStore: storeDetails }),
			}),
		[setState]
	);

	const resetSelectedStore = useCallback(
		() =>
			storeLocatorUpdater({
				setState,
				later: async (storeLocator) => ({
					...storeLocator,
					selectedStore: {} as StoreDetails,
				}),
			}),
		[setState]
	);
	return {
		storeLocator: storeLocator || STORE_LOCATOR_BASE_STATE,
		actions: { selectStore, resetSelectedStore },
	};
};
