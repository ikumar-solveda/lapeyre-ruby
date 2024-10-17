/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { updateCartFetcher, useCartSWRKey } from '@/data/Content/Cart';
import { useInventoryV2 } from '@/data/Content/InventoryV2';
import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { shippingInfoFetcher } from '@/data/Content/_ShippingInfo';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_SHIPPING_INFO } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ORDER_CONFIGS } from '@/data/constants/order';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { OrderItem } from '@/data/types/Order';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { StoreDetails } from '@/data/types/Store';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { dynamicESpotMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/dynamicESpotMutatorKeyMatcher';
import { usableShippingInfoMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/usableShippingInfoMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { uniq } from 'lodash';
import { useCallback, useMemo } from 'react';
import useSWR, { mutate } from 'swr';

type MapPartNumber<T> = Record<string, Array<Omit<T, 'partNumber'>>>;
const EMPTY_AVAILABILITY = [] as ProductAvailabilityData[];

export const useOrderItemTableBase = (
	orderItems: OrderItem[],
	orderId: string,
	physicalStore?: StoreDetails
) => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { notifyError } = useNotifications();
	const currentCartSWRKey = useCartSWRKey(); // in current language

	const joinedPartNumbers = uniq(orderItems?.map(({ partNumber }) => partNumber) ?? []).join(',');

	const {
		availability: availabilityData = EMPTY_AVAILABILITY,
		isLoading: inventoryLoading,
		error: inventoryError,
	} = useInventoryV2({ partNumber: joinedPartNumbers, physicalStore });

	const { data: usableShipping } = useSWR(
		storeId && orderItems.length > 0
			? [{ storeId, query: { langId } }, DATA_KEY_SHIPPING_INFO]
			: null,
		async ([{ storeId, query }]) => shippingInfoFetcher(true)(storeId, query, params),
		{ revalidateOnMount: true }
	);

	const availability = useMemo(
		() =>
			inventoryLoading
				? null
				: availabilityData.reduce(
						(
							acc: MapPartNumber<ProductAvailabilityData>,
							{ partNumber, ...others }: ProductAvailabilityData
						) => {
							const ffms = acc[partNumber] ?? [];
							ffms.push(others);
							acc[partNumber] = ffms;
							return acc;
						},
						{}
				  ),
		[availabilityData, inventoryLoading]
	);

	const updateOrderItem = useCallback(
		(orderItemId: string) => async (quantity: number | null) => {
			if (quantity !== null && orderItemId) {
				const orderItem = {
					quantity: quantity.toString(),
					orderItemId,
				};

				const data = {
					orderId,
					x_calculateOrder: ORDER_CONFIGS.calculateOrder,
					orderItem: [orderItem],
					x_calculationUsage: ORDER_CONFIGS.calculationUsage,
					x_inventoryValidation: ORDER_CONFIGS.inventoryValidation.toString(),
					x_validateInventoryForFulfillmentCenter:
						ORDER_CONFIGS.inventoryValidationForFulfillmentCenter.toString(),
				};
				try {
					await updateCartFetcher(true)(storeId ?? '', {}, data, params);
					await mutate(cartMutatorKeyMatcher(EMPTY_STRING)); // at current page
					await mutate(dynamicESpotMutatorKeyMatcher(EMPTY_STRING)); // at current page
					await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // all cart except current cart, e.g different locale
					await mutate(usableShippingInfoMutatorKeyMatcher(EMPTY_STRING), undefined);
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			}
		},
		[orderId, storeId, params, currentCartSWRKey, notifyError]
	);

	return {
		updateOrderItem,
		availability,
		usableShipping,
		inventoryLoading,
		inventoryError,
	};
};
