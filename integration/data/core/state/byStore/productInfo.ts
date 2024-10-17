/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getInitState } from '@/data/state/provider';
import { ProductInfo, ProductInfoData } from '@/data/types/Product';

const PRODUCT_INFO_BASE = { productInfo: {} as ProductInfo };

export const GET_PRODUCT_INFO_BASE_STATE = (key: string): ProductInfoData =>
	getInitState(key, PRODUCT_INFO_BASE);
