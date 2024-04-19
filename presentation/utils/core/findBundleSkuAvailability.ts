/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import { BundleTableRowData } from '@/data/types/Product';
import { StoreDetails } from '@/data/types/Store';
import { getInventoryRecordV2 } from '@/data/utils/getInventoryRecordV2';
import { getBundleSkuInventoryStatus } from '@/utils/getBundleSkuInventoryStatus';

export const findBundleSkuAvailability = (
	row: BundleTableRowData,
	physicalStore?: StoreDetails
) => {
	const { availability, selectedSku, isOneSku, partNumber: parentPartNumber } = row;
	const partNumber = selectedSku?.partNumber ?? (isOneSku ? parentPartNumber : EMPTY_STRING);
	const online = getInventoryRecordV2(availability, partNumber);
	const onlineStatus = getBundleSkuInventoryStatus(online, row);
	const offline = physicalStore
		? getInventoryRecordV2(availability, partNumber, physicalStore)
		: undefined;
	const offlineStatus = offline ? getBundleSkuInventoryStatus(offline, row) : undefined;
	return { offlineStatus, onlineStatus, offline, online, partNumber };
};
