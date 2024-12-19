/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { INVENTORY_PBC_STATUS } from '@/data/constants/inventory';
import type { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';

export const validateSkuTypeTableBackorderDisplay = (
	availability: ProductAvailabilityData[],
	partNumber: string,
	showCount: boolean
) => {
	const availabilityForSKU = availability.filter(
		(avail) =>
			avail.partNumber === partNumber && avail.inventoryStatus === INVENTORY_PBC_STATUS.backorder
	);
	let showOnlineCount = showCount;
	let showOfflineCount = showCount;
	let backorderPickup;
	let backorderDelivery;

	if (availabilityForSKU.length) {
		backorderPickup = availabilityForSKU.find((avail) => avail.physicalStoreId);
		showOfflineCount = !backorderPickup && showCount;

		backorderDelivery = availabilityForSKU.find((avail) => !avail.physicalStoreId);
		showOnlineCount = !backorderDelivery && showCount;
	}

	return {
		showOnlineCount,
		showOfflineCount,
		backorderPickup,
		backorderDelivery,
	};
};
