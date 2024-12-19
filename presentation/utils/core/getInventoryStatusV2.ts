/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { hasInStock } from '@/data/Content/_Inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { StoreDetails } from '@/data/types/Store';
import { getInventoryRecordV2 } from '@/data/utils/getInventoryRecordV2';
import { formatAvailability } from '@/utils/formatAvailability';

export const getInventoryStatusV2 = (
	partNumber: string,
	availability: ProductAvailabilityData[],
	physicalStore: StoreDetails,
	showCount: boolean,
	locale?: string
) => {
	const online = getInventoryRecordV2(availability, partNumber as string);
	const offline = getInventoryRecordV2(availability, partNumber as string, physicalStore);
	const onlineStatus = hasInStock(online);
	const offlineStatus = physicalStore?.physicalStoreName ? hasInStock(offline) : false;
	const onlineCount = showCount
		? formatAvailability(locale, online?.availableQuantity)
		: EMPTY_STRING;
	const offlineCount = showCount
		? formatAvailability(locale, offline?.availableQuantity)
		: EMPTY_STRING;
	const disabled = !offlineStatus && !onlineStatus;

	return { online, offline, onlineStatus, offlineStatus, onlineCount, offlineCount, disabled };
};
