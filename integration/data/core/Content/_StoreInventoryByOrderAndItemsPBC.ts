/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	AVAILABLE_STATUSES,
	BACK_ORDER_STATUSES,
	UNIFIED_STATUSES,
} from '@/data/constants/inventory';
import { StoreInventoryByOrder, StoreInventoryByOrderItem } from '@/data/types/Inventory';
import { StoreDetails } from '@/data/types/Store';
import { dFix } from '@/data/utils/floatingPoint';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { InventoryLocations } from 'integration/generated/inventory-pbc/InventoryLocations';
import {
	LocateInventoryRequest,
	LocateInventoryResponse,
} from 'integration/generated/inventory-pbc/data-contracts';
import inventoryPbcInventoryLocations from 'integration/generated/inventory-pbc/inventoryPbcInventoryLocations';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { groupBy, keyBy } from 'lodash';
import { GetServerSidePropsContext } from 'next';

export type FetcherPropsPBC = {
	query: Parameters<InventoryLocations['getInventoryLocationsWithRequestBody']>[0];
	data: LocateInventoryRequest;
	params?: RequestParams;
};

export type FetcherPropsPBCGet = {
	query: Parameters<InventoryLocations['getInventoryLocations']>[0];
	params?: RequestParams;
};

export const dataMap = (
	dataPBC: LocateInventoryResponse | undefined,
	physicalStores: StoreDetails[],
	partNumbers: string
) => {
	const byId = keyBy(physicalStores, 'x_defaultFulfillmentCenterExtId');
	const pns = partNumbers.split(',');
	const result: Record<string, StoreInventoryByOrder> = {};
	dataPBC?.contents?.forEach((fulfillmentInfo) => {
		const { fulfillmentCenter = '', items = [] } = fulfillmentInfo;
		const physicalStoreId = byId[fulfillmentCenter]?.id;
		if (physicalStoreId) {
			const total = pns.length;
			const { availableItems = [], unavailableItems = [] } = groupBy(items, ({ status = '' }) =>
				AVAILABLE_STATUSES[status] ? 'availableItems' : 'unavailableItems'
			);
			const backorder = items.filter(({ status = '' }) => BACK_ORDER_STATUSES[status]).length;
			const available = pns.filter((pn) =>
				availableItems.some((item) => item.partNumber === pn)
			).length;
			const unavailable = pns.filter((pn) =>
				unavailableItems.some((item) => item.partNumber === pn)
			).length;
			result[physicalStoreId] = {
				physicalStoreId,
				overallInventoryStatus:
					available > 0 && unavailable === 0
						? UNIFIED_STATUSES.AVAILABLE
						: available === 0 && unavailable > 0
						? UNIFIED_STATUSES.UNAVAILABLE
						: UNIFIED_STATUSES.PARTIAL,
				backorder,
				counts: available !== total && unavailable !== total ? { available, total } : undefined,
			};
		}
	});

	return result;
};

export const dataMapPartNumbers = (dataPBC: LocateInventoryResponse | undefined) => {
	const result = {} as Record<string, StoreInventoryByOrderItem>;
	dataPBC?.contents?.at(0)?.items?.forEach((item) => {
		result[item.partNumber ?? ''] = {
			quantity: dFix(item.quantity ?? 0, 0),
			status: AVAILABLE_STATUSES[item.status ?? '']
				? UNIFIED_STATUSES.AVAILABLE
				: UNIFIED_STATUSES.UNAVAILABLE,
			originalStatus: item.status,
		};
	});
	return result;
};

export const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ query, data = {}, params = {} }: FetcherPropsPBC) => {
		try {
			const res = await inventoryPbcInventoryLocations(pub).getInventoryLocationsWithRequestBody(
				query,
				data,
				params
			);
			return res;
		} catch (error: any) {
			if (error.status === 404) {
				return undefined;
			}
			errorWithId(getRequestId(context), '_InventoryStatusByOrderPBC: fetcherPBC: error', {
				error,
			});
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};

export const byQueryFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ query, params = {} }: FetcherPropsPBCGet) => {
		try {
			const res = await inventoryPbcInventoryLocations(pub).getInventoryLocations(query, params);
			return res;
		} catch (error: any) {
			if (error.status === 404) {
				return undefined;
			}
			errorWithId(getRequestId(context), '_InventoryStatusByOrderPBC: fetcherPBCGet: error', {
				error,
			});
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};
