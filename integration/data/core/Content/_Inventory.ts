/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getLocalization } from '@/data/Localization';
import { dFix, getSettings, useSettings } from '@/data/Settings';
import { DATA_KEY_INVENTORY } from '@/data/constants/dataKey';
import { AVAILABLE_STATUSES } from '@/data/constants/inventory';
import { Cache } from '@/data/types/Cache';
import { InventoryResponse, ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { RequestQuery } from '@/data/types/RequestQuery';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { error as logError } from '@/data/utils/loggerUtil';
import { transactionsInventoryAvailability } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import { useMemo } from 'react';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

const ONLINE_STORE_KEY = 'Online';

export const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		partNumber: string, // CSV
		query: RequestQuery = {},
		params: RequestParams,
		productIds?: string // v9.1.16.0
	): Promise<InventoryResponse | undefined> => {
		try {
			const res = productIds
				? ((await transactionsInventoryAvailability(
						pub
				  ).inventoryAvailabilityGetInventoryAvailabilityByProductId(
						storeId,
						productIds,
						query,
						params
				  )) as InventoryResponse)
				: ((await transactionsInventoryAvailability(
						pub
				  ).inventoryAvailabilityGetInventoryAvailabilityByPartNumber(
						storeId,
						partNumber,
						query,
						params
				  )) as InventoryResponse);
			return res;
		} catch (error) {
			if (pub) {
				throw error;
			}

			logError(context?.req, '_Inventory: fetcher: error: %o', error);
			return undefined;
		}
	};

export const dataMap = (data: InventoryResponse): ProductAvailabilityData[] => {
	// open-api spec typing isn't accurate -- using custom type here
	const all = data.InventoryAvailability ?? [];

	return all.map(
		(pn) =>
			({
				...(pn.onlineStoreId && {
					...pn,
					storeId: pn.onlineStoreId,
					storeName: ONLINE_STORE_KEY,
					status: AVAILABLE_STATUSES[`${pn.inventoryStatus}`],
				}),
				...(pn.physicalStoreId && {
					...pn,
					physicalStoreId: pn.physicalStoreId,
					storeName: pn.physicalStoreName,
					physicalStoreStatus: AVAILABLE_STATUSES[`${pn.inventoryStatus}`],
				}),
			} as ProductAvailabilityData)
	);
};

/**
 * @deprecated using `getInventoryRecordV2` instead
 */
export const getInventoryRecord = (
	inventories: ProductAvailabilityData[],
	partNumber: string,
	storeName = ONLINE_STORE_KEY
) =>
	inventories?.find(
		({ partNumber: _pn, storeName: _store }) => _pn === partNumber && _store === storeName
	) as ProductAvailabilityData;

export const hasInStock = (availability: ProductAvailabilityData | undefined, quantity?: number) =>
	AVAILABLE_STATUSES[`${availability?.inventoryStatus}`] &&
	(quantity === undefined || quantity <= dFix(availability?.availableQuantity ?? 0, 0));

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
	const { localeName: locale } = await getStoreLocale({ cache, context });
	const routes = await getLocalization(cache, locale, 'Routes');
	const { storeId, langId } = getServerSideCommon(settings, context);
	const props = { storeId, partNumber, langId };
	const key = unstableSerialize([shrink(props), DATA_KEY_INVENTORY]);
	const params = constructRequestParamsWithPreviewToken({ context, settings, routes });
	const value = cache.get(key) || fetcher(false, context)(storeId, partNumber, {}, params);
	cache.set(key, value);
	return await value;
};

/**
 * @param ids comma-separated specification of partNumbers
 * @param physicalStoreName
 * @param productIds comma-separated specification of productIds - added V9.1.16.0
 * @deprecated in favour of `useInventoryV2`
 */
export const useInventory = (ids = '', physicalStoreName = '', productIds?: string) => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const {
		data,
		error,
		mutate: mutateInventory,
	} = useSWR(
		storeId
			? ids
				? [
						shrink({
							storeId,
							partNumber: ids as string,
							langId,
							...(physicalStoreName && { query: { physicalStoreName } }),
						}),
						DATA_KEY_INVENTORY,
				  ]
				: productIds
				? [
						shrink({
							storeId,
							productIds,
							partNumber: '',
							langId,
							...(physicalStoreName && { query: { physicalStoreName } }),
						}),
						DATA_KEY_INVENTORY,
				  ]
				: null
			: null,
		async ([props]) => {
			const expanded = expand<Record<string, any>>(props);
			const { storeId, partNumber, productIds, query } = expanded;
			return fetcher(true)(storeId, partNumber, query, params, productIds);
		},
		// defect HC-34836
		{ revalidateIfStale: true, dedupingInterval: 30000 }
	);
	const availability = useMemo(() => (data ? dataMap(data) : data), [data]);

	return {
		availability,
		hasInventory: !!availability?.find((iv) => iv.status || iv.physicalStoreStatus),
		loading: !error && !data,
		mutateInventory,
		error,
	};
};
