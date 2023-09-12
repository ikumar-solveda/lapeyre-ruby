/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { PRODUCT_INFO_STATE_KEY } from '@/data/constants/product';
import { GET_PRODUCT_INFO_BASE_STATE } from '@/data/state/byStore/productInfo';
import { getStateUpdater, useSetState, useTrackedState } from '@/data/state/provider';
import { ProductInfo, ProductInfoData } from '@/data/types/Product';
import { getStateKey } from '@/data/utils/getStateKey';
import { useCallback, useMemo } from 'react';

/**
 * React hook for use by the presentation layer to read product info state
 * data and expose event handlers (actions) related to data changes.
 */

export const useProductInfoState = () => {
	const { settings } = useSettings();
	const key = useMemo(() => getStateKey(PRODUCT_INFO_STATE_KEY, settings), [settings]);
	const productInfoUpdater = useMemo(
		() =>
			getStateUpdater({
				key,
				baseState: GET_PRODUCT_INFO_BASE_STATE(key),
			}),
		[key]
	);

	const setState = useSetState();
	const fullState = useTrackedState();
	const productInfoData = fullState[key] as ProductInfoData;

	const update = useCallback(
		(currentProductInfo: Partial<ProductInfo>) =>
			productInfoUpdater({
				setState,
				now: ({ productInfo, ...rest }) => ({
					...rest,
					productInfo: { ...productInfo, ...currentProductInfo },
				}),
			}),
		[productInfoUpdater, setState]
	);

	const removeData = useCallback(
		() =>
			productInfoUpdater({
				setState,
				later: async () => ({ productInfo: {} as ProductInfo }),
			}),
		[productInfoUpdater, setState]
	);
	return {
		productInfoData: productInfoData || GET_PRODUCT_INFO_BASE_STATE(key),
		actions: { update, removeData },
	};
};
