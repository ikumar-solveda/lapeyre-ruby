/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ONLINE_STORE_KEY } from '@/data/constants/inventory';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { StoreDetails } from '@/data/types/Store';

export const getInventoryRecordV2 = (
	inventories: ProductAvailabilityData[],
	partNumber: string,
	physicalStore?: StoreDetails
) => {
	const storeName = physicalStore ? physicalStore.physicalStoreName : ONLINE_STORE_KEY;
	const externalFFMId = physicalStore?.x_defaultFulfillmentCenterExtId;

	return inventories?.find(
		({ partNumber: _pn, storeName: _store, pbcData }) =>
			_pn === partNumber &&
			((!physicalStore && _store === storeName) ||
				(physicalStore &&
					((!pbcData && _store === storeName) ||
						(pbcData && pbcData.fulfillmentCenter.id === externalFFMId))))
	) as ProductAvailabilityData;
};
