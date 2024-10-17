/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useCartSWRKey } from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useOrderItemTableBase } from '@/data/Content/_OrderItemTableBase';
import { shippingInfoUpdateFetcher } from '@/data/Content/_ShippingInfo';
import { useSettings } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { BopisRequestOrderItem } from '@/data/types/CheckOut';
import { OrderItem } from '@/data/types/Order';
import { OrderTableData } from '@/data/types/OrderItemTableV2';
import { StoreDetails } from '@/data/types/Store';
import { dFix } from '@/data/utils/floatingPoint';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { dynamicESpotMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/dynamicESpotMutatorKeyMatcher';
import { processShippingInfoUpdateError } from '@/data/utils/processShippingInfoUpdateError';
import { useCallback, useMemo } from 'react';
import { mutate } from 'swr';

export const useOrderItemTableV2 = (
	orderItems: OrderItem[],
	orderId: string,
	physicalStore?: StoreDetails
) => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { notifyError } = useNotifications();
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const { updateOrderItem, availability, usableShipping, inventoryLoading, inventoryError } =
		useOrderItemTableBase(orderItems, orderId, physicalStore);

	const toggleFulfillmentMethod = useCallback(
		(orderItemId: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
			const physicalStoreId = (event.target as HTMLInputElement).value;
			const orderItem = { orderItemId } as BopisRequestOrderItem;
			const body = { orderItem: [orderItem] };
			if (physicalStoreId) {
				const shipModeId =
					usableShipping?.orderItem
						?.find(({ orderItemId: itemId }) => itemId === orderItemId)
						?.usableShippingMode?.find(({ shipModeCode }) => shipModeCode === SHIP_MODE_CODE_PICKUP)
						?.shipModeId ?? '';
				orderItem.shipModeId = shipModeId;
				orderItem.physicalStoreId = physicalStoreId;
			} else {
				const shipModeId =
					usableShipping?.orderItem
						?.find(({ orderItemId: itemId }) => itemId === orderItemId)
						?.usableShippingMode?.find(({ shipModeCode }) => shipModeCode !== SHIP_MODE_CODE_PICKUP)
						?.shipModeId ?? '';
				orderItem.shipModeId = shipModeId;
			}
			try {
				await shippingInfoUpdateFetcher(storeId ?? '', {}, body, params);
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING)); // at current page
				await mutate(dynamicESpotMutatorKeyMatcher(EMPTY_STRING)); // at current page
				await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // all cart except current cart, e.g different locale
			} catch (error) {
				console.error('Error in toggle fulfillment method', error);
				notifyError(processShippingInfoUpdateError(error as TransactionErrorResponse));
			}
		},
		[currentCartSWRKey, notifyError, params, storeId, usableShipping]
	);

	const data = useMemo<OrderTableData[]>(
		() =>
			orderItems
				? orderItems.map((orderItem) => {
						const {
							partNumber,
							quantity,
							orderItemId,
							orderItemPrice,
							unitPrice,
							currency,
							contractId,
							freeGift,
							physicalStoreId,
							physicalStoreExternalId,
						} = orderItem || {};

						return {
							itemDetails: {
								partNumber,
								orderItemId,
								contractId,
								currency,
								unitPrice,
								key: 'partNumber',
							},
							availability: {
								availability: availability ? availability[partNumber] : null,
								loading: inventoryLoading,
								error: inventoryError,
								onChange: toggleFulfillmentMethod(orderItemId),
								key: 'availability',
							},
							quantity: {
								quantity: dFix(quantity, 0),
								onChange: updateOrderItem(orderItemId),
								key: 'quantity',
								numeric: true,
								isControlled: true,
							},
							price: {
								orderItemPrice,
								currency,
								key: 'orderItemPrice',
								numeric: true,
							},
							fulfillment: {
								type: physicalStoreId ? 'pickup' : 'delivery',
								physicalStoreExternalId,
							},
							physicalStoreId,
							freeGift: freeGift.toLowerCase() === 'true',
						};
				  })
				: ([] as OrderTableData[]),
		[
			availability,
			inventoryError,
			inventoryLoading,
			orderItems,
			toggleFulfillmentMethod,
			updateOrderItem,
		]
	);

	return {
		data,
	};
};
