/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import type { Settings } from '@/data/Settings';
import { SKIP_ERROR_LOGGING } from '@/data/constants/common';
import { DATA_KEY_INVENTORY } from '@/data/constants/dataKey';
import {
	AVAILABLE_STATUSES,
	INVENTORY_PBC_EXT_FFM_ID,
	ONLINE_STORE_KEY,
} from '@/data/constants/inventory';
import type { InventorySWRKeyProps } from '@/data/types/Inventory';
import type { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import type { StoreDetails } from '@/data/types/Store';
import { getRequestId } from '@/data/utils/getRequestId';
import { isNonATP } from '@/data/utils/isNonATP';
import { shrink } from '@/data/utils/keyUtil';
import { errorWithId } from '@/data/utils/loggerUtil';
import type { ItemInventory } from 'integration/generated/inventory-pbc/ItemInventory';
import type { InventoryResponse } from 'integration/generated/inventory-pbc/data-contracts';
import inventoryPbcItemInventory from 'integration/generated/inventory-pbc/inventoryPbcItemInventory';
import { omit } from 'lodash';
import type { GetServerSidePropsContext } from 'next';

type Props = {
	query: NonNullable<Parameters<ItemInventory['getInventoryItemAvailability']>[0]>;
	params: Parameters<ItemInventory['getInventoryItemAvailability']>[1];
};

export const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ query, params }: Props) => {
		try {
			const res = await inventoryPbcItemInventory(pub).getInventoryItemAvailability(query, {
				skipErrorLogging: SKIP_ERROR_LOGGING,
				...params,
			});
			return res;
		} catch (error: any) {
			if (error.status === 404) {
				return undefined;
			}

			if (pub) {
				throw error;
			}
			errorWithId(getRequestId(context), '_InventoryPBC: fetcher: error', { error });
			return undefined;
		}
	};

const sorter = (a: ProductAvailabilityData, b: ProductAvailabilityData) =>
	a.pbcData?.fulfillmentCenter.type === b.pbcData?.fulfillmentCenter.type
		? 0
		: a.pbcData?.fulfillmentCenter.type === 'online_store'
		? 1
		: -1;

export const dataMap = (
	response: InventoryResponse,
	settings: Settings,
	physicalStore?: StoreDetails
): ProductAvailabilityData[] => {
	const rc: ProductAvailabilityData[] = [];
	response.contents?.forEach((partNumberGroup) => {
		const { partNumber = '', unitOfMeasure, fulfillmentCenters } = partNumberGroup;
		fulfillmentCenters?.forEach((ffmCenter) => {
			const { availableQuantity, inventoryStatus = '', name = '', type } = ffmCenter;
			const availability = {
				partNumber,
				unitOfMeasure,
				inventoryStatus,
				availableQuantity: `${availableQuantity}`,
				pbcData: {
					root: omit(partNumberGroup, 'fulfillmentCenters', 'unitOfMeasure'),
					fulfillmentCenter: ffmCenter,
				},
			};
			const status = !!AVAILABLE_STATUSES[inventoryStatus];
			if (type === 'online_store') {
				Object.assign(availability, {
					storeId: settings.storeId,
					status,
					storeName: ONLINE_STORE_KEY,
				});
			} else if (type === 'physical_store') {
				Object.assign(availability, {
					physicalStoreId: physicalStore?.id,
					physicalStoreStatus: status,
					storeName: name,
				});
			}

			rc.push(availability as ProductAvailabilityData);
		});
	});
	rc.sort(sorter);
	return rc;
};

export const getSWRKey = ({ partNumber, physicalStore, settings }: InventorySWRKeyProps) => {
	const { identifier } = settings;
	const onlineExternalFFMId = settings.userData[INVENTORY_PBC_EXT_FFM_ID];
	const physicalExternalFFMId = physicalStore?.x_defaultFulfillmentCenterExtId;
	const availableToPromise = isNonATP(settings) ? false : undefined;

	return partNumber && identifier
		? [
				shrink({
					availableToPromise,
					store: identifier,
					partNumber,
					fulfillmentCenter: [physicalExternalFFMId, onlineExternalFFMId].filter(Boolean).join(','),
				}),
				DATA_KEY_INVENTORY,
		  ]
		: null;
};
