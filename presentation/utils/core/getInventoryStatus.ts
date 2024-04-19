/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { hasInStock } from '@/data/Content/_Inventory';
import { InventoryStatusType } from '@/data/types/Inventory';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';

export const getInventoryStatus = (iv: ProductAvailabilityData): InventoryStatusType => {
	let rc: InventoryStatusType;
	const inStock = hasInStock(iv);
	if (!inStock) {
		rc = { status: false, translationKey: 'OOS' };
	} else {
		rc = { status: true, translationKey: 'Available' };
	}
	return rc;
};
