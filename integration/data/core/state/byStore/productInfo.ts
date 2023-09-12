/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getInitState } from '@/data/state/provider';
import { ProductInfoData, ProductInfo } from '@/data/types/Product';

export const GET_PRODUCT_INFO_BASE_STATE = (key: string): ProductInfoData =>
	getInitState(key, {
		productInfo: {} as ProductInfo,
	});
