/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getInventoryRecord } from '@/data/Content/_Inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { BundleTableRowData } from '@/data/types/Product';
import { getBundleSkuInventoryStatus } from '@/utils/getBundleSkuInventoryStatus';

/**
 * @deprecated use `findBundleSkuAvailability` instead
 */
export const findAvailability = (row: BundleTableRowData, store: string) => {
	const { availability, selectedSku, isOneSku, partNumber: parentPartNumber } = row;
	const partNumber = selectedSku?.partNumber ?? (isOneSku ? parentPartNumber : EMPTY_STRING);
	const online = getInventoryRecord(availability, partNumber);
	const onlineStatus = getBundleSkuInventoryStatus(online, row);
	const offline = store ? getInventoryRecord(availability, partNumber, store) : undefined;
	const offlineStatus = store ? getBundleSkuInventoryStatus(offline, row) : undefined;
	return { offlineStatus, onlineStatus, offline, online, partNumber };
};
