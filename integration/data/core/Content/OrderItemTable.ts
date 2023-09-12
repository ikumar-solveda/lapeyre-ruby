/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { updateCartFetcher, useCart } from '@/data/Content/Cart';
import { useNotifications } from '@/data/Content/Notifications';
import { useProduct } from '@/data/Content/Product';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useInventory } from '@/data/Content/_Inventory';
import { useSettings } from '@/data/Settings';
import { ORDER_CONFIGS } from '@/data/constants/order';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { CatSEO } from '@/data/types/Category';
import { OrderItem } from '@/data/types/Order';
import { ProductDisplayPrice, ProductType, ResponseProductAttribute } from '@/data/types/Product';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { dFix } from '@/data/utils/floatingPoint';
import { processError } from '@/data/utils/processError';
import { get, partition, uniq } from 'lodash';
import { useCallback, useMemo } from 'react';

type MapPartNumber<T> = Record<string, Array<Omit<T, 'partNumber'>>>;
export type ColumnWithKey = {
	key: string;
	numeric?: boolean;
	[extra: string]: any;
};
const EMPTY_AVAILABILITY = [] as ProductAvailabilityData[];
export const useOrderItemTable = (
	orderItems: OrderItem[],
	orderId: string,
	physicalStoreName?: string
) => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const { mutateCart } = useCart();
	const { notifyError } = useNotifications();

	const joinedPartNumbers = uniq(orderItems?.map(({ partNumber }) => partNumber) ?? []).join(',');

	const {
		availability: availabilityData = EMPTY_AVAILABILITY,
		loading: inventoryLoading,
		error: inventoryError,
	} = useInventory(joinedPartNumbers, physicalStoreName);

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
				};
				try {
					await updateCartFetcher(true)(settings?.storeId ?? '', {}, data, params);
					await mutateCart();
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			}
		},
		[orderId, settings?.storeId, params, mutateCart, notifyError]
	);

	const data = useMemo(
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
								key: 'availability',
							},
							quantity: {
								quantity: dFix(quantity, 0),
								onChange: updateOrderItem(orderItemId),
								key: 'quantity',
								numeric: true,
							},
							price: {
								orderItemPrice,
								currency,
								key: 'orderItemPrice',
								numeric: true,
							},
						};
				  })
				: [],
		[availability, inventoryError, inventoryLoading, orderItems, updateOrderItem]
	);

	return {
		data,
	};
};

const EMPTY_SEO = {} as CatSEO;
const EMPTY_PRICE = {} as ProductDisplayPrice;
const EMPTY_PROD = {} as ProductType;
const EMPTY_ATTRS: ResponseProductAttribute[] = [];

export const useOrderItemTableRow = (
	partNumber: string,
	contractId?: string | string[],
	_orderItemId = ''
) => {
	const { product = EMPTY_PROD, loading } = useProduct({ id: partNumber, contractId });
	const {
		attributes = EMPTY_ATTRS,
		name = '',
		productPrice = EMPTY_PRICE,
		seo: { href = '' } = EMPTY_SEO,
		manufacturer = '',
		thumbnail = '',
		sellerId,
		seller,
	} = product;
	const [colorAttributes, otherAttributes] = partition(
		attributes,
		({ identifier }) => identifier === 'Color'
	);
	const color = get(colorAttributes[0], 'values[0].value', '');

	return {
		details: {
			partNumber,
			name,
			color,
			thumbnail,
			href,
			prices: productPrice,
			attributes: otherAttributes,
			manufacturer,
			seller,
			sellerId,
			loading,
		},
	};
};
