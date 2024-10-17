/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { STRING_TRUE } from '@/data/constants/catalog';
import { DATA_KEY_INVENTORY_STATUS_BY_ORDER } from '@/data/constants/dataKey';
import { INVENTORY_DEDUPING_INTERVAL, INVENTORY_PBC } from '@/data/constants/inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { dataMap, fetcher, FetcherProps } from '@/data/Content/_StoreInventoryByOrderAndItems';
import {
	dataMap as dataMapPBC,
	fetcher as fetcherPBC,
	FetcherPropsPBC,
} from '@/data/Content/_StoreInventoryByOrderAndItemsPBC';
import { Settings, useSettings } from '@/data/Settings';
import { Order, OrderItem } from '@/data/types/Order';
import { StoreDetails } from '@/data/types/Store';
import { dFix } from '@/data/utils/floatingPoint';
import { expand, shrink } from '@/data/utils/keyUtil';
import {
	LocateInventoryItemRequestModel,
	LocateInventoryRequest,
} from 'integration/generated/inventory-pbc/data-contracts';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import useSWR from 'swr';

type Props = {
	order?: Order;
	physicalStores: StoreDetails[];
};

const getSWRKey = ({
	orderId,
	physicalStores,
	settings,
}: {
	orderId: string | undefined;
	physicalStores: StoreDetails[];
	settings: Settings;
}) => {
	const { storeId } = settings;
	return orderId && !isEmpty(physicalStores)
		? [
				shrink({
					storeId,
					orderId,
					query: {
						physicalStoreId: physicalStores.map(({ id }) => id).join(','),
						checkPickupItemsOnly: true,
					},
				}),
				DATA_KEY_INVENTORY_STATUS_BY_ORDER,
		  ]
		: null;
};

const getSWRKey_PBC = ({
	fulfillmentCenter,
	orderItemDetails,
	settings,
}: {
	fulfillmentCenter: string[] | undefined;
	orderItemDetails: LocateInventoryRequest;
	settings: Settings;
}) => {
	const { identifier } = settings;
	return !isEmpty(orderItemDetails) && !isEmpty(fulfillmentCenter)
		? [
				shrink({
					query: {
						store: identifier,
						fulfillmentCenter: fulfillmentCenter?.join(','),
					},
					data: orderItemDetails as any,
				}),
				DATA_KEY_INVENTORY_STATUS_BY_ORDER,
		  ]
		: null;
};

export const useStoreInventoryByOrder = ({ order, physicalStores }: Props) => {
	const { settings } = useSettings();

	const usesPBC = settings.userData[INVENTORY_PBC] === STRING_TRUE;
	const orderId = order?.orderId ?? '';
	const params = useExtraRequestParameters();
	const fulfillmentCenter = useMemo(
		() =>
			usesPBC
				? physicalStores.map((store) => store.x_defaultFulfillmentCenterExtId ?? EMPTY_STRING)
				: [],
		[physicalStores, usesPBC]
	);
	const { orderItemDetails, partNumbers } = useMemo(() => {
		let result = { partNumbers: [], itemMap: {} } as {
			partNumbers: string[];
			itemMap: {
				[partNumber: string]: Required<LocateInventoryItemRequestModel>;
			};
		};
		if (usesPBC) {
			result = (order?.orderItem ?? []).reduce<{
				partNumbers: string[];
				itemMap: {
					[partNumber: string]: Required<LocateInventoryItemRequestModel>;
				};
			}>((accumulator, orderItem: OrderItem) => {
				if (orderItem.shipModeCode === SHIP_MODE_CODE_PICKUP) {
					accumulator.partNumbers.push(orderItem.partNumber);
					const { partNumber, UOM: unitOfMeasure } = orderItem;
					const part = accumulator.itemMap[orderItem.partNumber] ?? {
						partNumber,
						quantity: 0,
						unitOfMeasure,
					};
					accumulator.itemMap[orderItem.partNumber] = {
						...part,
						quantity: part.quantity + dFix(orderItem.quantity, 0),
					};
				}
				return { ...accumulator };
			}, result);
		}
		return {
			orderItemDetails: { items: Object.values(result.itemMap) },
			partNumbers: result.partNumbers.sort().join(','),
		};
	}, [order, usesPBC]);

	const {
		data,
		error: errorTS,
		isLoading: isLoadingTS,
		mutate: mutateInventoryByOrderTS,
	} = useSWR(
		orderId && !usesPBC ? getSWRKey({ orderId, physicalStores, settings }) : null,
		async ([props]) => {
			const expanded = expand<FetcherProps>(props as Parameters<typeof expand>[0]);
			return fetcher(true)({ ...expanded, params });
		},
		{ revalidateIfStale: true, dedupingInterval: INVENTORY_DEDUPING_INTERVAL }
	);

	const {
		data: dataPBC,
		error: errorPBC,
		isLoading: isLoadingPBC,
		mutate: mutateInventoryByOrderPBC,
	} = useSWR(
		orderId && usesPBC ? getSWRKey_PBC({ fulfillmentCenter, orderItemDetails, settings }) : null,
		async ([props]) => {
			const expanded = expand<FetcherPropsPBC>(props as Parameters<typeof expand>[0]);
			return fetcherPBC(true)({ ...expanded, params });
		},
		{ revalidateIfStale: true, dedupingInterval: INVENTORY_DEDUPING_INTERVAL }
	);

	const pbc = useMemo(
		() => dataMapPBC(dataPBC, physicalStores, partNumbers),
		[dataPBC, physicalStores, partNumbers]
	);
	const ts = useMemo(() => dataMap(data), [data]);

	return {
		availabilities: usesPBC ? pbc : ts,
		error: usesPBC ? errorPBC : errorTS,
		isLoading: usesPBC ? isLoadingPBC : isLoadingTS,
		mutateInventoryByOrder: usesPBC ? mutateInventoryByOrderPBC : mutateInventoryByOrderTS,
	};
};
