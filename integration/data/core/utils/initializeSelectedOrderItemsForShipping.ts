/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { isUsingAllowedValues } from '@/data/Content/_ShippingInfo';
import { OrderItem } from '@/data/types/Order';
import type { CartUsableShippingInfoOrderItem } from 'integration/generated/transactions/data-contracts';
import { Dictionary, uniqWith } from 'lodash';

const isSameShipping = (item1: OrderItem, item2: OrderItem) =>
	item1.addressId === item2.addressId && item1.shipModeId === item2.shipModeId;
/**
 * Size of the returned array determine whether it is single or multiple shipment.
 * see {@link '../../../../presentation/components/core/content/CheckOut/parts/Shipping/readme.md'}
 * @param orderItems
 * @returns
 */
export const initializeSelectedOrderItemsForShipping = (
	orderItems: OrderItem[] = [],
	entriesByOrderItemId?: Dictionary<CartUsableShippingInfoOrderItem>
) => {
	const allWithAllowedAddresses = orderItems.every((item) =>
		isUsingAllowedValues(item, entriesByOrderItemId as Dictionary<CartUsableShippingInfoOrderItem>)
	);
	const uniqueByAddressAndShipmode = uniqWith(orderItems, isSameShipping);
	if (uniqueByAddressAndShipmode.length > 1 || !allWithAllowedAddresses) {
		return [] as OrderItem[];
	} else {
		return [...orderItems];
	}
};
