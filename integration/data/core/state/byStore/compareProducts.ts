/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getInitState } from '@/data/state/provider';
import { CompareData, CompareProductsData } from '@/data/types/Compare';

export const GET_COMPARE_PRODUCTS_BASE_STATE = (key: string): CompareProductsData =>
	getInitState(key, {
		compareData: {} as CompareData,
	});
