/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { dataMap, fetcher } from '@/data/Content/_Inventory';
import {
	dataMap as dataMapPBC,
	fetcher as fetcherPBC,
	getSWRKey as getSWRKey_PBC,
} from '@/data/Content/_InventoryPBC';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getLocalization } from '@/data/Localization';
import { getSettings, useSettings } from '@/data/Settings';
import { STRING_TRUE } from '@/data/constants/catalog';
import { DATA_KEY_INVENTORY } from '@/data/constants/dataKey';
import {
	INVENTORY_DEDUPING_INTERVAL,
	INVENTORY_PBC,
	INVENTORY_PBC_EXT_FFM_ID,
} from '@/data/constants/inventory';
import { Cache } from '@/data/types/Cache';
import { InventorySWRKeyProps } from '@/data/types/Inventory';
import { InventoryResponse } from '@/data/types/ProductAvailabilityData';
import { StoreDetails } from '@/data/types/Store';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { GetServerSidePropsContext } from 'next';
import { useMemo } from 'react';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

const getSWRKey = ({
	settings,
	physicalStore,
	partNumber,
	productIds,
	langId,
}: InventorySWRKeyProps) => {
	const { storeId } = settings;
	return storeId
		? partNumber
			? [
					shrink({
						storeId,
						partNumber,
						langId,
						...(physicalStore?.physicalStoreName && {
							query: { physicalStoreName: physicalStore.physicalStoreName },
						}),
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
						...(physicalStore?.physicalStoreName && {
							query: { physicalStoreName: physicalStore.physicalStoreName },
						}),
					}),
					DATA_KEY_INVENTORY,
			  ]
			: null
		: null;
};

export const getInventoryV2 = async (
	cache: Cache,
	partNumber: string,
	context: GetServerSidePropsContext
): Promise<{ key: string; value: InventoryResponse }[]> => {
	const settings = await getSettings(cache, context);
	const routes = await getLocalization(cache, context.locale || 'en-US', 'Routes');
	const { storeId, langId } = getServerSideCommon(settings, context);
	const { identifier: store } = settings;
	const usesPBC = settings.userData[INVENTORY_PBC] === STRING_TRUE;
	const fulfillmentCenter = [settings.userData[INVENTORY_PBC_EXT_FFM_ID]].filter(Boolean).join(',');
	const props = usesPBC
		? { store, partNumber, fulfillmentCenter }
		: { storeId, partNumber, langId };
	const key = unstableSerialize([shrink(props), DATA_KEY_INVENTORY]);
	const params = constructRequestParamsWithPreviewToken({ context, settings, routes });
	await getLocalization(cache, context.locale || 'en-US', 'Inventory');
	const value =
		cache.get(key) ||
		(usesPBC
			? fetcherPBC(false, context)({ query: props, params })
			: fetcher(false, context)(storeId, partNumber, {}, params));
	cache.set(key, value);
	return await value;
};

type Props = {
	partNumber?: string;
	productIds?: string;
	physicalStore?: StoreDetails;
};
export const useInventoryV2 = ({ partNumber, productIds, physicalStore }: Props) => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { langId } = getClientSideCommon(settings, router);
	const usesPBC = settings.userData[INVENTORY_PBC] === STRING_TRUE;
	const params = useExtraRequestParameters();

	const limit = useMemo(
		() =>
			partNumber
				?.split(',')
				.map((_partNumber) => _partNumber.trim())
				.filter(Boolean).length,
		[partNumber]
	);
	const {
		data,
		error,
		isLoading: isLoadingTS,
		mutate: mutateInventory,
	} = useSWR(
		!usesPBC ? getSWRKey({ settings, physicalStore, productIds, partNumber, langId }) : null,
		async ([props]) => {
			const expanded = expand<Record<string, any>>(props as Parameters<typeof expand>[0]);
			const { storeId, partNumber, productIds, query } = expanded;
			return fetcher(true)(storeId, partNumber, query, params, productIds);
		},
		// defect HC-34836
		{
			revalidateIfStale: true,
			dedupingInterval: INVENTORY_DEDUPING_INTERVAL,
		}
	);

	const {
		data: dataPBC,
		error: errorPBC,
		isLoading: isLoadingPBC,
		mutate: mutateInventoryPBC,
	} = useSWR(
		usesPBC ? getSWRKey_PBC({ settings, physicalStore, partNumber }) : null,
		async ([props]) => {
			const expanded = expand<Record<string, any>>(props as Parameters<typeof expand>[0]);
			const { store, partNumber, fulfillmentCenter } = expanded;
			return fetcherPBC(true)({ query: { store, partNumber, fulfillmentCenter, limit }, params });
		},
		{
			revalidateIfStale: true,
			dedupingInterval: INVENTORY_DEDUPING_INTERVAL,
		}
	);

	const ts = useMemo(() => (data ? dataMap(data) : data), [data]);
	const pbc = useMemo(
		() => (dataPBC ? dataMapPBC(dataPBC, settings, physicalStore) : dataPBC),
		[dataPBC, physicalStore, settings]
	);
	const availability = usesPBC ? pbc : ts;
	const hasInventory = useMemo(
		() => !!availability?.find((iv) => iv.status || iv.physicalStoreStatus),
		[availability]
	);

	return {
		availability,
		hasInventory,
		isLoading: usesPBC ? isLoadingPBC : isLoadingTS,
		loading: usesPBC ? !errorPBC && !dataPBC : !error && !data,
		mutateInventory: usesPBC ? mutateInventoryPBC : mutateInventory,
		error,
	};
};
