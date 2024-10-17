/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getInitState, useInitState } from '@/data/state/provider';
import { CompareData, CompareProductsData } from '@/data/types/Compare';

const COMPARE_PRODUCTS_BASE = {
	compareData: {} as CompareData,
	initialized: false,
};

/** @deprecated, use `useCompareProductsBaseState` */
export const GET_COMPARE_PRODUCTS_BASE_STATE = (key: string): CompareProductsData =>
	getInitState(key, COMPARE_PRODUCTS_BASE);

export const useCompareProductsBaseState = (key: string): CompareProductsData =>
	useInitState(key, COMPARE_PRODUCTS_BASE);
