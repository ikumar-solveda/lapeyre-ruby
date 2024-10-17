/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useSkuListTable } from '@/data/Content/SkuListTable';
import { StoreInventoryByOrderItem } from '@/data/types/Inventory';
import { ProductType } from '@/data/types/Product';
import { StoreDetails } from '@/data/types/Store';

export type SkuListTableAuxiliaryContextValue = ReturnType<typeof useSkuListTable> & {
	embedded?: boolean;
	physicalStore: StoreDetails;
	product: ProductType; // non-nullable
	/**
	 * @deprecated use `physicalStore` instead
	 */
	store?: string;
};

export type GPSIACNestedSkuListTableContextValue = {
	availabilities: Record<string, StoreInventoryByOrderItem>;
	parentProduct: ProductType;
};
