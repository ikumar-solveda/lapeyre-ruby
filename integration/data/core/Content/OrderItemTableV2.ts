/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { BASE_ADD_2_CART_BODY, updateCartFetcher, useCartSWRKey } from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useOrderItemTableBase } from '@/data/Content/_OrderItemTableBase';
import { shippingInfoUpdateFetcher } from '@/data/Content/_ShippingInfo';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import type { TransactionErrorResponse } from '@/data/types/Basic';
import type { BopisRequestOrderItem } from '@/data/types/CheckOut';
import type { OrderItem } from '@/data/types/Order';
import type { OrderTableData } from '@/data/types/OrderItemTableV2';
import type { ScheduleForLaterType } from '@/data/types/ScheduleForLater';
import type { StoreDetails } from '@/data/types/Store';
import { dFix } from '@/data/utils/floatingPoint';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getEpochTime } from '@/data/utils/getEpochTime';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { dynamicESpotMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/dynamicESpotMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { processShippingInfoUpdateError } from '@/data/utils/processShippingInfoUpdateError';
import { useCallback, useMemo } from 'react';
import { mutate } from 'swr';

export const useOrderItemTableV2 = (
	orderItems: OrderItem[],
	orderId: string,
	physicalStore?: StoreDetails
) => {
	const success = useLocalization('success-message');
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { notifyError, showSuccessMessage } = useNotifications();
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

	const updateRequestedShipDate = useCallback(
		(orderItemId: string) => async (quantity: number, schedule: ScheduleForLaterType) => {
			const orderItem = {
				quantity: quantity.toString(),
				orderItemId,
				xitem_requestedShipDate: schedule.enabled ? schedule.date?.toISOString() : getEpochTime(),
			};
			const data = { ...BASE_ADD_2_CART_BODY, orderItem: [orderItem] };
			const { partNumber = EMPTY_STRING, physicalStoreId } =
				orderItems.find(({ orderItemId: itemId }) => itemId === orderItemId) ?? {};
			try {
				await updateCartFetcher(true)(storeId ?? '', {}, data, params);
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING));
				await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // cart in other languages
				showSuccessMessage(
					physicalStoreId
						? success.UPDATE_REQUESTED_PICKUP_DATE_MESSAGE.t({
								partNumber,
						  })
						: success.UPDATE_REQUESTED_SHIP_DATE_MESSAGE.t({
								partNumber,
						  })
				);
			} catch (e) {
				notifyError(processError(e as TransactionErrorResponse));
			}
		},
		[currentCartSWRKey, notifyError, orderItems, params, showSuccessMessage, storeId, success]
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
							requestedShipDate,
							orderItemFulfillmentStatus,
							orderItemStatus,
							orderItemInventoryStatus,
							expectedShipDate,
						} = orderItem || {};

						return {
							itemDetails: {
								partNumber,
								orderItemId,
								contractId,
								currency,
								unitPrice,
								key: 'partNumber',
								requestedShipDate,
								onExpectedDateChange: updateRequestedShipDate(orderItemId),
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
								orderItemFulfillmentStatus,
								orderItemStatus,
								orderItemInventoryStatus,
								expectedShipDate,
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
			updateRequestedShipDate,
		]
	);

	return {
		data,
	};
};
