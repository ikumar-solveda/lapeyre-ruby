/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { COMPARE_PRODUCTS_STATE_KEY } from '@/data/constants/compare';
import { COMPARE_PRODUCTS_BASE_STATE } from '@/data/state/base/compareProducts';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { CompareData, CompareProductsData } from '@/data/types/Compare';
import { useCallback } from 'react';

const compareProductsUpdater = getStateUpdater({
	key: COMPARE_PRODUCTS_STATE_KEY,
	baseState: COMPARE_PRODUCTS_BASE_STATE,
});

/**
 * React hook for use by the presentation layer to read compare products state
 * data and expose event handlers (actions) related to data changes.
 */

export const useCompareProductsState = () => {
	const setState = useSetState();
	const { compareProducts } = useTrackedState() as {
		compareProducts: CompareProductsData;
	};

	const update = useCallback(
		(compareDataDetails: CompareData) =>
			compareProductsUpdater({
				setState,
				now: (compareProducts) => ({ ...compareProducts, compareData: compareDataDetails }),
			}),
		[setState]
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
		[setState]
	);
	return {
		compareProductsData: compareProducts || COMPARE_PRODUCTS_BASE_STATE,
		actions: { update, removeData },
	};
};
