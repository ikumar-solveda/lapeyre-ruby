/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SkuListTableData } from '@/data/types/Product';
import { StoreDetails } from '@/data/types/Store';
import { getInventoryRecordV2 } from '@/data/utils/getInventoryRecordV2';
import { getInventoryStatus } from '@/utils/getInventoryStatus';

export const findSkuListSkuAvailability = (row: SkuListTableData, physicalStore: StoreDetails) => {
	const { availability, partNumber } = row;
	const online = getInventoryRecordV2(availability, partNumber);
	const offline = getInventoryRecordV2(availability, partNumber, physicalStore);
	const onlineStatus = getInventoryStatus(online);
	const offlineStatus = physicalStore.physicalStoreName ? getInventoryStatus(offline) : undefined;
	return { onlineStatus, offlineStatus };
};
