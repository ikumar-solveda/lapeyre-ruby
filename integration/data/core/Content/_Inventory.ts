/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { dFix, getSettings, useSettings } from '@/data/Settings';
import { Cache } from '@/data/types/Cache';
import { InventoryResponse, ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { RequestQuery } from '@/data/types/RequestQuery';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { transactionsInventoryAvailability } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import { useMemo } from 'react';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

const ONLINE_STORE_KEY = 'Online';
const AVAILABLE_KEY = 'Available';
const DATA_KEY_INVENTORY = 'inventory';

const fetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		partNumber: string, // CSV
		query: RequestQuery = {},
		params: RequestParams
	): Promise<InventoryResponse | undefined> => {
		try {
			const res = (await transactionsInventoryAvailability(
				pub
			).inventoryAvailabilityGetInventoryAvailabilityByPartNumber(
				storeId,
				partNumber,
				query,
				params
			)) as InventoryResponse;
			return res;
		} catch (error) {
			if (pub) {
				throw error;
			}
			console.log(error);
			return undefined;
		}
	};

const dataMap = (data: InventoryResponse): ProductAvailabilityData[] => {
	// open-api spec typing isn't accurate -- using custom type here
	const all = data.InventoryAvailability ?? [];

	return all.map(
		(pn) =>
			({
				...(pn.onlineStoreId && {
					...pn,
					storeId: pn.onlineStoreId,
					storeName: ONLINE_STORE_KEY,
					status: pn.inventoryStatus === AVAILABLE_KEY,
				}),
				...(pn.physicalStoreId && {
					...pn,
					physicalStoreId: pn.physicalStoreId,
					storeName: pn.physicalStoreName,
					physicalStoreStatus: pn.inventoryStatus === AVAILABLE_KEY,
				}),
			} as ProductAvailabilityData)
	);
};

export const getInventoryRecord = (
	inventories: ProductAvailabilityData[],
	partNumber: string,
	storeName = ONLINE_STORE_KEY
) =>
	inventories.find(
		({ partNumber: _pn, storeName: _store }) => _pn === partNumber && _store === storeName
	) as ProductAvailabilityData;

export const hasInStock = (availability: ProductAvailabilityData | undefined, quantity?: number) =>
	availability?.inventoryStatus === AVAILABLE_KEY &&
	(quantity === undefined || quantity <= dFix(availability.availableQuantity ?? 0, 0));

export const getInventory = async (
	cache: Cache,
	partNumber: string,
	context: GetServerSidePropsContext
): Promise<
	{
		key: string;
		value: InventoryResponse;
	}[]
> => {
	const settings = await getSettings(cache, context);
	const { storeId, langId } = getServerSideCommon(settings, context);
	const props = { storeId, partNumber, langId };
	const key = unstableSerialize([shrink(props), DATA_KEY_INVENTORY]);
	const params = constructRequestParamsWithPreviewToken({ context });
	const value = cache.get(key) || fetcher(false)(storeId, partNumber, {}, params);
	cache.set(key, value);
	return await value;
};

/**
 *
 * @param ids comma-separated specification of partNumbers
 */
export const useInventory = (ids = '', physicalStoreName = '') => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { data, error } = useSWR(
		storeId && ids
			? [
					shrink({
						storeId,
						partNumber: ids as string,
						langId,
						...(physicalStoreName && { query: { physicalStoreName } }),
					}),
					DATA_KEY_INVENTORY,
			  ]
			: null,
		async ([props]) => {
			const expanded = expand<Record<string, any>>(props);
			const { storeId, partNumber, query } = expanded;
			return fetcher(true)(storeId, partNumber, query, params);
		},
		{ revalidateIfStale: true }
	);
	const availability = useMemo(() => (data ? dataMap(data) : data), [data]);

	return {
		availability,
		hasInventory: !!availability?.find((iv) => iv.status || iv.physicalStoreStatus),
		loading: !error && !data,
		error,
	};
};
