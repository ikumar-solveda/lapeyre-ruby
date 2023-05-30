/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getSettings, useSettings } from '@/data/Settings';
import { Cache } from '@/data/types/Cache';
import { InventoryResponse, ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { transactionsInventoryAvailability } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';
import { RequestQuery } from '@/data/types/RequestQuery';
import { useMemo } from 'react';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';

const ONLINE_STORE_KEY = 'Online'; // eslint-disable-line @typescript-eslint/no-unused-vars
const AVAILABLE_KEY = 'Available'; // eslint-disable-line @typescript-eslint/no-unused-vars
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
	const key = unstableSerialize([props, DATA_KEY_INVENTORY]);
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
					{
						storeId,
						partNumber: ids as string,
						langId,
						...(physicalStoreName && { query: { physicalStoreName } }),
					},
					DATA_KEY_INVENTORY,
			  ]
			: null,
		async ([props]) => fetcher(true)(props.storeId, props.partNumber, props.query, params),
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
