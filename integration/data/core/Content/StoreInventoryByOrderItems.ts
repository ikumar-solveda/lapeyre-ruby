/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { STRING_TRUE } from '@/data/constants/catalog';
import {
	DATA_KEY_INVENTORY_STATUS_BY_ORDER,
	DATA_KEY_INVENTORY_STATUS_BY_ORDER_ITEM,
} from '@/data/constants/dataKey';
import { INVENTORY_DEDUPING_INTERVAL, INVENTORY_PBC } from '@/data/constants/inventory';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import {
	byPartNumberFetcher,
	dataMapPartNumbers as dataMap,
	FetcherPartNumberProps,
} from '@/data/Content/_StoreInventoryByOrderAndItems';
import {
	dataMapPartNumbers as dataMapPBC,
	fetcher as fetcherPBC,
	FetcherPropsPBC,
} from '@/data/Content/_StoreInventoryByOrderAndItemsPBC';
import { Settings, useSettings } from '@/data/Settings';
import { Order } from '@/data/types/Order';
import { ProductType } from '@/data/types/Product';
import { StoreDetails } from '@/data/types/Store';
import { filterOrderItemByPickup } from '@/data/utils/filterOrderItemByPickup';
import { expand, shrink } from '@/data/utils/keyUtil';
import { mapToPartNumber } from '@/data/utils/mapToPartNumber';
import {
	LocateInventoryItemRequestModel,
	LocateInventoryRequest,
} from 'integration/generated/inventory-pbc/data-contracts';
import { isEmpty, keyBy } from 'lodash';
import { useMemo } from 'react';
import useSWR from 'swr';

type Props = {
	order?: Order;
	product?: ProductType;
	physicalStore?: StoreDetails;
};

const getSWRKey = ({
	partNumbers,
	physicalStoreName,
	settings,
}: {
	partNumbers: (string | undefined)[] | undefined;
	physicalStoreName: string | undefined;
	settings: Settings;
}) => {
	const { storeId } = settings;
	return !isEmpty(partNumbers) && !isEmpty(physicalStoreName)
		? [
				shrink({
					storeId,
					partNumbers: partNumbers?.join(','),
					query: {
						physicalStoreName,
					},
				}),
				DATA_KEY_INVENTORY_STATUS_BY_ORDER_ITEM,
		  ]
		: null;
};

const getSWRKey_PBC = ({
	fulfillmentCenter,
	orderItemDetails,
	settings,
}: {
	fulfillmentCenter: string | undefined;
	orderItemDetails: LocateInventoryRequest;
	settings: Settings;
}) => {
	const { identifier } = settings;
	return !isEmpty(orderItemDetails) && !isEmpty(fulfillmentCenter)
		? [
				shrink({
					query: {
						store: identifier,
						fulfillmentCenter,
					},
					data: orderItemDetails as any,
				}),
				DATA_KEY_INVENTORY_STATUS_BY_ORDER,
		  ]
		: null;
};

export const useStoreInventoryByOrderItems = ({ order, product, physicalStore }: Props) => {
	const { settings } = useSettings();
	const usesPBC = settings.userData[INVENTORY_PBC] === STRING_TRUE;
	const params = useExtraRequestParameters();
	const fulfillmentCenter = physicalStore?.x_defaultFulfillmentCenterExtId;
	const physicalStoreName = physicalStore?.physicalStoreName;
	const { partNumbers, orderItemDetails } = useMemo(() => {
		const orderItemsInPhysicalStore = order?.orderItem.filter(filterOrderItemByPickup);
		const partNumberInProduct = keyBy(product?.items.map(mapToPartNumber));
		const partNumbers = orderItemsInPhysicalStore
			?.filter((orderItem) => partNumberInProduct[orderItem.partNumber])
			.map(mapToPartNumber);
		let items: LocateInventoryItemRequestModel[] | undefined;
		if (usesPBC) {
			items = orderItemsInPhysicalStore
				?.map((orderItem) =>
					partNumbers?.includes(orderItem.partNumber)
						? {
								partNumber: orderItem.partNumber,
								unitOfMeasure: orderItem.UOM,
								quantity: Number(orderItem.quantity),
						  }
						: undefined
				)
				.filter(Boolean) as LocateInventoryItemRequestModel[];
		}
		return { partNumbers, orderItemDetails: { items } };
	}, [order?.orderItem, product?.items, usesPBC]);

	const {
		data,
		error: errorTS,
		isLoading: isLoadingTS,
		mutate: mutateInventoryByPartNumberTS,
	} = useSWR(
		!usesPBC ? getSWRKey({ partNumbers, physicalStoreName, settings }) : null,

		async ([props]) => {
			const expanded = expand<FetcherPartNumberProps>(props as Parameters<typeof expand>[0]);
			return byPartNumberFetcher(true)({ ...expanded, params });
		},
		{ revalidateIfStale: true, dedupingInterval: INVENTORY_DEDUPING_INTERVAL }
	);

	const {
		data: dataPBC,
		error: errorPBC,
		isLoading: isLoadingPBC,
		mutate: mutateInventoryByOrderPBC,
	} = useSWR(
		usesPBC ? getSWRKey_PBC({ fulfillmentCenter, orderItemDetails, settings }) : null,
		async ([props]) => {
			const expanded = expand<FetcherPropsPBC>(props as Parameters<typeof expand>[0]);
			return fetcherPBC(true)({ ...expanded, params });
		},
		{ revalidateIfStale: true, dedupingInterval: INVENTORY_DEDUPING_INTERVAL }
	);

	const pbc = useMemo(() => dataMapPBC(dataPBC), [dataPBC]);
	const ts = useMemo(() => dataMap(data), [data]);

	return {
		availabilities: usesPBC ? pbc : ts,
		error: usesPBC ? errorPBC : errorTS,
		isLoading: usesPBC ? isLoadingPBC : isLoadingTS,
		mutateInventoryByPartNumber: usesPBC
			? mutateInventoryByOrderPBC
			: mutateInventoryByPartNumberTS,
	};
};
