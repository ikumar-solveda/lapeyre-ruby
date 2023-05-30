/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { OrderItem } from '@/data/types/Order';
import { uniqWith } from 'lodash';

const isSameShipping = (item1: OrderItem, item2: OrderItem) =>
	item1.addressId === item2.addressId && item1.shipModeId === item2.shipModeId;
/**
 * Size of the returned array determine whether it is single or multiple shipment.
 * see {@link '../../../../presentation/components/core/content/CheckOut/parts/Shipping/readme.md'}
 * @param orderItems
 * @returns
 */
export const initializeSelectedOrderItemsForShipping = (orderItems: OrderItem[] = []) => {
	const uniqueByAddressAndShipmode = uniqWith(orderItems, isSameShipping);
	if (uniqueByAddressAndShipmode.length > 1) {
		return [] as OrderItem[];
	} else {
		return [...orderItems];
	}
};
