/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { updateCartFetcher, useCart, useCartSWRKey } from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useOrderItemTableBase } from '@/data/Content/_OrderItemTableBase';
import { shippingInfoUpdateFetcher } from '@/data/Content/_ShippingInfo';
import { useSettings } from '@/data/Settings';
import { AVAILABLE_STATUSES } from '@/data/constants/inventory';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ORDER_CONFIGS, SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import { useStoreLocatorState } from '@/data/state/useStoreLocatorState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { BopisRequestOrderItem } from '@/data/types/CheckOut';
import { OrderItem } from '@/data/types/Order';
import { OrderTableData } from '@/data/types/OrderItemTableV2';
import { dFix } from '@/data/utils/floatingPoint';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { dynamicESpotMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/dynamicESpotMutatorKeyMatcher';
import { processShippingInfoUpdateError } from '@/data/utils/processShippingInfoUpdateError';
import { partition } from 'lodash';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { mutate } from 'swr';

/**
 * Handles out of sync cart items either caused by merging cart of items out of stock
 */
export const useMergeCart = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { pickupOrderItemsFromOtherStore, deliveryOrderItems, data: order } = useCart();

	/**
	 * Order items that are out of stock or pickup from a different physical store as a result of merging cart
	 */
	const orderItems = useMemo(
		() => [
			...pickupOrderItemsFromOtherStore,
			...deliveryOrderItems.filter((item) => !AVAILABLE_STATUSES[item.orderItemInventoryStatus]),
		],
		[deliveryOrderItems, pickupOrderItemsFromOtherStore]
	);
	const orderId = order?.orderId ?? '';
	const dialogOpen = orderItems.length > 0;
	const {
		storeLocator: { selectedStore },
	} = useStoreLocatorState();
	const { storeId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { notifyError } = useNotifications();
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const { availability, usableShipping, inventoryLoading, inventoryError } = useOrderItemTableBase(
		orderItems,
		orderId,
		selectedStore
	);
	const _items = useMemo(
		() =>
			orderItems.map(({ orderItemId, quantity, physicalStoreId }) => ({
				orderItemId,
				physicalStoreId,
				quantity,
			})),
		[orderItems]
	);
	const [items, setItems] =
		useState<(Partial<BopisRequestOrderItem> & { quantity: string })[]>(_items);

	const onQuantity = useCallback(
		(orderItemId: string) => async (quantity: number | null) => {
			if (quantity !== null && orderItemId) {
				const _items = [...items];
				const orderItem = _items.find(({ orderItemId: itemId }) => itemId === orderItemId);
				if (orderItem) {
					orderItem.quantity = quantity.toString();
					setItems(_items);
				}
			}
		},
		[items]
	);

	const toggleFulfillmentMethod = useCallback(
		(orderItemId: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
			const physicalStoreId = (event.target as HTMLInputElement).value;
			const _items = [...items];
			const orderItem =
				_items.find(({ orderItemId: itemId }) => itemId === orderItemId) ??
				({
					orderItemId,
				} as BopisRequestOrderItem);
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
				delete orderItem.physicalStoreId;
			}
			setItems(_items);
		},
		[items, usableShipping]
	);

	const onConfirm = useCallback(
		async (_event: MouseEvent<HTMLButtonElement>) => {
			const [orderItemToDelete, orderItemShippingInfo] = partition(
				items,
				({ quantity }) => quantity === '0'
			);

			try {
				// delete items with quantity 0
				if (orderItemToDelete.length > 0) {
					const dataToDelete = {
						orderId,
						x_calculateOrder: ORDER_CONFIGS.calculateOrder,
						orderItem: orderItemToDelete.map<{ orderItemId: string; quantity: string }>(
							({ orderItemId = '', quantity }) => ({ orderItemId, quantity })
						),
						x_calculationUsage: ORDER_CONFIGS.calculationUsage,
						x_inventoryValidation: ORDER_CONFIGS.inventoryValidation.toString(),
					};
					await updateCartFetcher(true)(storeId ?? '', {}, dataToDelete, params);
				}
				if (orderItemShippingInfo.length > 0) {
					// update shipping info (fulfillment method)
					const shippingInfoToUpdate = {
						orderItem: orderItemShippingInfo.map<BopisRequestOrderItem>(
							({ orderItemId = '', physicalStoreId, shipModeId }) => ({
								orderItemId,
								shipModeId,
								...(physicalStoreId && { physicalStoreId }),
							})
						),
					};
					await shippingInfoUpdateFetcher(storeId ?? '', {}, shippingInfoToUpdate, params);
					// update quantity
					const quantityToUpdate = {
						orderId,
						x_calculateOrder: ORDER_CONFIGS.calculateOrder,
						orderItem: orderItemShippingInfo.map(({ orderItemId, quantity }) => ({
							orderItemId,
							quantity,
						})),
						x_calculationUsage: ORDER_CONFIGS.calculationUsage,
						x_inventoryValidation: ORDER_CONFIGS.inventoryValidation.toString(),
					};
					await updateCartFetcher(true)(storeId ?? '', {}, quantityToUpdate, params);
				}
				await mutate(cartMutatorKeyMatcher(EMPTY_STRING)); // at current page
				await mutate(dynamicESpotMutatorKeyMatcher(EMPTY_STRING)); // at current page
				await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // all cart except current cart, e.g different locale
			} catch (error) {
				notifyError(processShippingInfoUpdateError(error as TransactionErrorResponse));
			}
		},
		[currentCartSWRKey, items, notifyError, orderId, params, storeId]
	);

	const data = useMemo<OrderTableData[]>(
		() =>
			items && orderItems
				? orderItems.map((orderItem) => {
						const {
							partNumber,
							orderItemId,
							orderItemPrice,
							unitPrice,
							currency,
							contractId,
							freeGift,
							physicalStoreExternalId,
						} = orderItem || {};

						const { quantity, physicalStoreId } =
							items.find(({ orderItemId: itemId }) => itemId === orderItemId) ?? ({} as OrderItem);

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
								onChange: onQuantity(orderItemId),
								key: 'quantity',
								numeric: true,
								min: 0,
							},
							price: {
								orderItemPrice,
								currency,
								key: 'orderItemPrice',
								numeric: true,
							},
							fulfillment: {
								type: 'pickup',
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
			items,
			orderItems,
			toggleFulfillmentMethod,
			onQuantity,
		]
	);

	useEffect(() => {
		setItems(_items);
	}, [_items]);

	return {
		data,
		dialogOpen,
		onConfirm,
	};
};
