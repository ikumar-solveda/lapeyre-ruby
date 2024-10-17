/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { useSettings } from '@/data/Settings';
import { STORE_LOCATOR_STATE_KEY } from '@/data/constants/storeLocator';
import { useStoreLocatorBaseState } from '@/data/state/byStore/storeLocator';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { SelectedStoreLocator, StoreDetails } from '@/data/types/Store';
import { getStateKey } from '@/data/utils/getStateKey';
import { useCallback, useMemo } from 'react';

/**
 * React hook for use by the presentation layer to read selected store state
 * data and expose event handlers (actions) related to data changes.
 */

export const useStoreLocatorState = () => {
	const { settings } = useSettings();
	const key = useMemo(() => getStateKey(STORE_LOCATOR_STATE_KEY, settings), [settings]);
	const baseState = useStoreLocatorBaseState(key);
	const storeLocatorUpdater = useMemo(() => getStateUpdater({ key, baseState }), [baseState, key]);

	const setState = useSetState();
	const fullState = useTrackedState();
	const storeLocator = fullState[key] as SelectedStoreLocator;

	const selectStore = useCallback(
		(storeDetails: StoreDetails) =>
			storeLocatorUpdater({
				setState,
				now: (storeLocator) => ({ ...storeLocator, selectedStore: storeDetails }),
			}),
		[setState, storeLocatorUpdater]
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
		[setState, storeLocatorUpdater]
	);
	return {
		storeLocator: storeLocator || baseState,
		actions: { selectStore, resetSelectedStore },
	};
};
