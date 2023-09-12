/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { COMPARE_PRODUCTS_STATE_KEY } from '@/data/constants/compare';
import { GET_COMPARE_PRODUCTS_BASE_STATE } from '@/data/state/byStore/compareProducts';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { CompareData, CompareProductsData } from '@/data/types/Compare';
import { getStateKey } from '@/data/utils/getStateKey';
import { useCallback, useMemo } from 'react';

/**
 * React hook for use by the presentation layer to read compare products state
 * data and expose event handlers (actions) related to data changes.
 */

export const useCompareProductsState = () => {
	const { settings } = useSettings();
	const key = useMemo(() => getStateKey(COMPARE_PRODUCTS_STATE_KEY, settings), [settings]);
	const compareProductsUpdater = useMemo(
		() =>
			getStateUpdater({
				key,
				baseState: GET_COMPARE_PRODUCTS_BASE_STATE(key),
			}),
		[key]
	);

	const setState = useSetState();
	const fullState = useTrackedState();
	const compareProducts = fullState[key] as CompareProductsData;

	const update = useCallback(
		(compareDataDetails: CompareData) =>
			compareProductsUpdater({
				setState,
				now: (compareProducts) => ({ ...compareProducts, compareData: compareDataDetails }),
			}),
		[compareProductsUpdater, setState]
	);

	const removeData = useCallback(
		() =>
			compareProductsUpdater({
				setState,
				later: async (compareProducts) => ({
					...compareProducts,
					compareData: {} as CompareData,
				}),
			}),
		[compareProductsUpdater, setState]
	);
	return {
		compareProductsData: compareProducts || GET_COMPARE_PRODUCTS_BASE_STATE(key),
		actions: { update, removeData },
	};
};
