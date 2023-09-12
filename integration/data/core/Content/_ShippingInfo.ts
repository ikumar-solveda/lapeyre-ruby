/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import { ID } from '@/data/types/Basic';
import { BopisRequestBody } from '@/data/types/CheckOut';
import { OrderItem } from '@/data/types/Order';
import { PersonContact } from '@/data/types/Person';
import { transactionsShippingInfo } from 'integration/generated/transactions';
import {
	CartUsableShippingInfo,
	CartUsableShippingInfoOrderItem,
	ComIbmCommerceRestOrderHandlerShippingInfoHandlerUpdateShippingInfoBodyDescription,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { Dictionary, intersectionBy, keyBy } from 'lodash';

/**
 * This REST service method returns
 * 1. order level shipping addresses allowed for this order(current cart) as a single shipment shipping address. The single shipping
 * address means the whole order ships to one address instead of different addresses by order items.
 * 2. order item level of usable shipping addresses associated with the particular order item (product)
 */
export const shippingInfoFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		params: RequestParams
	) =>
		await transactionsShippingInfo(pub).cartGetUsableShippingInfo(storeId, query, params);
const emptyData = {} as
	| ComIbmCommerceRestOrderHandlerShippingInfoHandlerUpdateShippingInfoBodyDescription
	| BopisRequestBody;
export const shippingInfoUpdateFetcher = async (
	storeId: string,
	query: {
		[key: string]: string | boolean | ID[] | number;
	} = {},
	data:
		| ComIbmCommerceRestOrderHandlerShippingInfoHandlerUpdateShippingInfoBodyDescription
		| BopisRequestBody = emptyData,
	params: RequestParams
) =>
	await transactionsShippingInfo(true).shippingInfoUpdateOrderShippingInfo(
		storeId,
		query,
		data as any,
		params
	);

export const getUniqueShippingMethods = (
	usableShipping: CartUsableShippingInfo | undefined,
	orderItems?: OrderItem[]
) => {
	const asMap = keyBy(orderItems ?? [], 'orderItemId');
	const shipModes =
		usableShipping?.orderItem
			?.filter(({ orderItemId }) => !orderItems || asMap[orderItemId as string])
			.map(({ usableShippingMode }) => usableShippingMode ?? []) ?? [];
	return intersectionBy(...shipModes, 'shipModeId').filter(
		(mode) => mode.shipModeCode !== SHIP_MODE_CODE_PICKUP
	);
};

export const getUniqueAddresses = (
	usableShipping: CartUsableShippingInfo | undefined = {},
	shippingAddresses: PersonContact[],
	orderItems: OrderItem[] = []
) => {
	const itemsById = keyBy(orderItems, 'orderItemId');
	const addressesByAddressId = keyBy(shippingAddresses, 'addressId');
	const { orderItem: container = [] } = usableShipping;
	const addressesPerItem = container
		.filter(({ orderItemId }) => itemsById[orderItemId as string])
		.map(({ usableShippingAddress = [] }) => usableShippingAddress);
	const common = intersectionBy(...addressesPerItem, 'addressId');

	const rc = common
		.filter(({ addressId }) => !!addressesByAddressId[addressId as string])
		.map<PersonContact>((usableAddress) => ({
			...usableAddress,
			...addressesByAddressId[usableAddress.addressId as string],
		}));

	return rc;
};

export const isUsingAllowedValues = (
	orderItem: OrderItem,
	entriesByOrderItemId: Dictionary<CartUsableShippingInfoOrderItem>
) => {
	const entry = entriesByOrderItemId?.[orderItem.orderItemId];
	const usableAddresses = entry?.usableShippingAddress ?? [];
	const usableModes = entry?.usableShippingMode ?? [];
	return (
		usableAddresses.some(({ addressId }) => addressId === orderItem.addressId) &&
		usableModes.some(({ shipModeId }) => shipModeId === orderItem.shipModeId)
	);
};
