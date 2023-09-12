/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { COMPARE_PRODUCTS_STATE_KEY } from '@/data/constants/compare';
import { getInitState } from '@/data/state/provider';
import { CompareData, CompareProductsData } from '@/data/types/Compare';

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
export const COMPARE_PRODUCTS_BASE_STATE: CompareProductsData = getInitState(
	COMPARE_PRODUCTS_STATE_KEY,
	{
		compareData: {} as CompareData,
	}
);
