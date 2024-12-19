/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { AVAILABLE_STATUSES, UNIFIED_STATUSES } from '@/data/constants/inventory';
import {
	StoreInventoryByOrder,
	StoreInventoryByOrderItem,
	TransactionPerItemAvailability,
} from '@/data/types/Inventory';
import { dFix } from '@/data/utils/floatingPoint';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import type {
	InventoryavailabilityInventoryavailability,
	InventoryavailabilityInventoryavailabilityByorderid,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { InventoryAvailability } from 'integration/generated/transactions/InventoryAvailability';
import transactionsInventoryAvailability from 'integration/generated/transactions/transactionsInventoryAvailability';
import { isEmpty, keyBy } from 'lodash';
import { GetServerSidePropsContext } from 'next';

export type FetcherProps = {
	storeId: string;
	orderId: string;
	query: Parameters<
		InventoryAvailability['inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId']
	>[2];
	params?: RequestParams;
};

export type FetcherPartNumberProps = {
	storeId: string;
	partNumbers: string;
	query: Parameters<
		InventoryAvailability['inventoryAvailabilityGetInventoryAvailabilityByPartNumber']
	>[2];
	params?: RequestParams;
};

export const dataMap = (
	inventory?: InventoryavailabilityInventoryavailabilityByorderid
): Record<string, StoreInventoryByOrder> =>
	keyBy(inventory?.overallInventoryAvailability, 'physicalStoreId');

export const dataMapPartNumbers = (
	data: InventoryavailabilityInventoryavailability | undefined
) => {
	const result = {} as Record<string, StoreInventoryByOrderItem>;
	const records = (data?.InventoryAvailability ?? []) as TransactionPerItemAvailability[];
	records
		.filter(({ physicalStoreId }) => physicalStoreId)
		.forEach((record) => {
			if (isEmpty(result[record.partNumber])) {
				result[record.partNumber] = {
					quantity: dFix(record?.availableQuantity ?? '', 0),
					status: AVAILABLE_STATUSES[record?.inventoryStatus ?? '']
						? UNIFIED_STATUSES.AVAILABLE
						: UNIFIED_STATUSES.UNAVAILABLE,
				};
			}
		});
	return result;
};

export const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ storeId, orderId, query, params = {} }: FetcherProps) => {
		try {
			return await transactionsInventoryAvailability(
				pub
			).inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId(
				storeId,
				orderId,
				query,
				params
			);
		} catch (error: any) {
			if (error.status === 404) {
				return undefined;
			}
			errorWithId(getRequestId(context), '_InventoryStatusByOrder: fetcher: error', { error });
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};

export const byPartNumberFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ storeId, partNumbers, query, params = {} }: FetcherPartNumberProps) => {
		try {
			return await transactionsInventoryAvailability(
				pub
			).inventoryAvailabilityGetInventoryAvailabilityByPartNumber(
				storeId,
				partNumbers,
				query,
				params
			);
		} catch (error: any) {
			if (error.status === 404) {
				return undefined;
			}
			errorWithId(getRequestId(context), '_InventoryStatusByOrder: fetcherPartNumber: error', {
				error,
			});
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};
