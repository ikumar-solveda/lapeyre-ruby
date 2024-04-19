/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { updateCartFetcher, useCartSWRKey } from '@/data/Content/Cart';
import { useInventoryV2 } from '@/data/Content/InventoryV2';
import { useNotifications } from '@/data/Content/Notifications';
import { useProduct } from '@/data/Content/Product';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useSettings } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { ORDER_CONFIGS } from '@/data/constants/order';
import { PAGINATION, SINGLE_RECORD } from '@/data/constants/tablePagination';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { CatSEO } from '@/data/types/Category';
import { OrderItem } from '@/data/types/Order';
import { ProductDisplayPrice, ProductType, ResponseProductAttribute } from '@/data/types/Product';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';
import { StoreDetails } from '@/data/types/Store';
import { dFix } from '@/data/utils/floatingPoint';
import { cartMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/cartMutatorKeyMatcher';
import { usableShippingInfoMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/usableShippingInfoMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import { PaginationState } from '@tanstack/react-table';
import { get, partition, uniq } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { mutate } from 'swr';

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
	/** @deprecated use `physicalStore` instead */
	physicalStoreName?: string,
	physicalStore?: StoreDetails
) => {
	const { settings } = useSettings();
	const { storeId } = settings;
	const params = useExtraRequestParameters();
	const { notifyError } = useNotifications();
	const currentCartSWRKey = useCartSWRKey(); // in current language
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});
	const { pageIndex, pageSize } = pagination;

	const joinedPartNumbers = uniq(orderItems?.map(({ partNumber }) => partNumber) ?? []).join(',');

	const {
		availability: availabilityData = EMPTY_AVAILABILITY,
		isLoading: inventoryLoading,
		error: inventoryError,
	} = useInventoryV2({ partNumber: joinedPartNumbers, physicalStore });

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
					await updateCartFetcher(true)(storeId ?? '', {}, data, params);
					await mutate(cartMutatorKeyMatcher(EMPTY_STRING)); // at current page
					await mutate(cartMutatorKeyMatcher(currentCartSWRKey), undefined); // all cart except current cart, e.g different locale
					await mutate(usableShippingInfoMutatorKeyMatcher(EMPTY_STRING), undefined);
					// go back a page if this page will no longer exist
					if (
						pageIndex > 0 &&
						pageIndex === pageCount - 1 &&
						currentPageRecords.length === SINGLE_RECORD
					) {
						setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
					}
				} catch (e) {
					notifyError(processError(e as TransactionErrorResponse));
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[orderId, storeId, params, currentCartSWRKey, pageIndex, notifyError]
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
							freeGift,
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
							freeGift: freeGift.toLowerCase() === 'true',
						};
				  })
				: [],
		[availability, inventoryError, inventoryLoading, orderItems, updateOrderItem]
	);

	const { pageCount, currentPageRecords, totalRecords } = useMemo(() => {
		const totalRecords = data.length ?? 0;
		const startIdx = pageIndex * pageSize;
		const endIdx = startIdx + pageSize;
		const currentPageRecords = data.slice(startIdx, endIdx);
		const pageCount = Math.ceil(totalRecords / pageSize);
		return { pageCount, currentPageRecords, totalRecords };
	}, [data, pageIndex, pageSize]);

	return {
		data: currentPageRecords,
		pageCount,
		pagination,
		setPagination,
		totalRecords,
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
