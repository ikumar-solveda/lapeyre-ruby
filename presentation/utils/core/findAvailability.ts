/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { InventoryStatusType } from '@/components/content/Bundle/parts/Table/Availability';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { dFix } from '@/data/Settings';
import { getInventoryRecord, hasInStock } from '@/data/Content/_Inventory';
import { BundleTableRowData } from '@/data/types/Product';

const getInventoryStatus = (
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

export const findAvailability = (row: BundleTableRowData, store: string) => {
	const { availability, selectedSku, isOneSku, partNumber: parentPartNumber } = row;
	const partNumber = selectedSku?.partNumber ?? (isOneSku ? parentPartNumber : EMPTY_STRING);
	const online = getInventoryRecord(availability, partNumber);
	const onlineStatus = getInventoryStatus(online, row);
	const offline = store ? getInventoryRecord(availability, partNumber, store) : undefined;
	const offlineStatus = store ? getInventoryStatus(offline, row) : undefined;
	return { offlineStatus, onlineStatus, offline, online, partNumber };
};
