/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { hasInStock } from '@/data/Content/_Inventory';
import { dFix } from '@/data/Settings';
import { InventoryStatusType } from '@/data/types/Inventory';
import { BundleTableRowData } from '@/data/types/Product';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';

export const getBundleSkuInventoryStatus = (
	iv: ProductAvailabilityData | undefined,
	rowData: BundleTableRowData
): InventoryStatusType => {
	const { quantity, isOneSku, selectedSku } = rowData;
	const onHand = dFix(iv?.availableQuantity ?? '0', 0);
	const askedFor = dFix(quantity, 0);
	let rc: InventoryStatusType;

	if (selectedSku || (isOneSku && !selectedSku)) {
		const inStock = hasInStock(iv);
		if (!inStock) {
			rc = { status: false, translationKey: 'OOS' };
		} else if (onHand < askedFor) {
			rc = { status: false, translationKey: 'NA' };
		} else {
			rc = { status: true, translationKey: 'Available' };
		}
	} else {
		rc = {};
	}
	return rc;
};
