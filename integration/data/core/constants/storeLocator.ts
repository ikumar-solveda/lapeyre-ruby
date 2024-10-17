/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { ID } from '@/data/types/Basic';
import { RequestParams } from 'integration/generated/transactions/http-client';

export const STORE_LOCATOR_LIBRARY: any = ['places'];
export const STORE_LIST_RADIUS = 40;
export const GOOGLE_MAP_REGION = 'ca';

export const GOOGLE_MAP_ZOOM = {
	INIT: 9,
	ZOOM: 14,
};

export const DEFAULT_LOCATION = {
	// Toronto
	lat: 43.653217,
	lng: -79.383181,
};

export const STORE_LOCATOR_STATE_KEY = 'storeLocator';

export type ByPhysicalStoreIdParams = {
	storeId: string;
	physicalStoreId: string;
	query: {
		[key: string]: string | boolean | ID[] | number;
	};
	params?: RequestParams;
};

export const INIT_CLICKED_STORE_INDEX = -1;

export const PRODUCT_INFO_TABLE_PREFIX = 'product-info-table';
export const ORDER_SKU_LIST_TABLE_PREFIX = 'order-sku-list-table';

export const STORE_LOCATOR_STORE_SEARCH_TEXT_FIELD_ID = 'store-locator-store-search-text-field';
