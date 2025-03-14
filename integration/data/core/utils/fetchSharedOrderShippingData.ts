/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { getUniqueShippingMethods } from '@/data/Content/_ShippingInfo';
import type { User } from '@/data/_User';
import { ORDER_TYPE, SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import type { OrderItem } from '@/data/types/Order';
import type {
	CartUsableShippingAddress,
	CartUsableShippingInfo,
} from 'integration/generated/transactions/data-contracts';
import { cloneDeep, isEmpty, keyBy, uniqBy } from 'lodash';

/**
 * For a shared order, updates individual order-items' shipping-info to include all order-addresses.
 * This is to ensure that the shipping-addresses for the owner of the order are available to all
 * contributors' items.
 *
 * @param orderTypeCode order type code
 * @param usableShipping shipping-info data
 * @param orderItems order-items data
 * @param user current-usr data
 * @returns cloned `usableShipping` if applicable, otherwise `usableShipping` as-is
 */
const consolidateOrderShipping = (
	orderTypeCode: string,
	usableShipping: CartUsableShippingInfo | undefined,
	orderItems: OrderItem[],
	user: User | undefined
) => {
	let rc = usableShipping;
	if (usableShipping && user) {
		const orderAddresses = usableShipping.usableShippingAddress;

		if (orderAddresses?.length && orderTypeCode === ORDER_TYPE.SHARED) {
			// locate order-items not owned by order owner
			const foreign = orderItems.filter(({ xitem_memberId }) => xitem_memberId !== user.userId);
			if (foreign.length) {
				const itemById = keyBy(foreign, 'orderItemId');

				// clone shipping-info to avoid mutation elsewhere
				rc = cloneDeep(usableShipping);

				// find shipping-info for these order-items
				const ofInterest =
					rc.orderItem?.filter(({ orderItemId }) => itemById[`${orderItemId}`]) ?? [];

				// add order-addresses to item addresses
				ofInterest.forEach((oi) => {
					const addresses = oi.usableShippingAddress ?? [];
					oi.usableShippingAddress = uniqBy([...addresses, ...orderAddresses], 'addressId');
				});
			}
		}
	}
	return rc;
};

/**
 * For a shared order, returns the order-items and addresses for the order owner and contributors.
 * Contributor items are those that are not owned by the order owner and do not have any of the
 * owner's addresses.
 *
 * @param orderTypeCode order type code
 * @param usableShipping shipping-info data
 * @param orderItems order-items data
 * @param user current-user data
 * @returns as per description
 */
const getActionableContributors = (
	orderTypeCode: string,
	usableShipping: CartUsableShippingInfo | undefined,
	orderItems: OrderItem[],
	user: User | undefined
) => {
	if (orderTypeCode === ORDER_TYPE.SHARED && usableShipping && user) {
		const ownerItems = orderItems.filter((item) => item.xitem_memberId === user?.userId) ?? [];
		const ownerItemsById = keyBy(
			orderItems.filter((item) => item.xitem_memberId === user?.userId) ?? [],
			'orderItemId'
		);
		const ownerAddresses =
			(isEmpty(ownerItems)
				? usableShipping?.usableShippingAddress
				: (usableShipping?.orderItem
						?.filter((item) => ownerItemsById[`${item.orderItemId}`])
						?.map((item) => item.usableShippingAddress)
						.flat()
						.filter(Boolean) as CartUsableShippingAddress[])) ?? [];
		const ownerAddressesById = keyBy(ownerAddresses, 'addressId');
		const contributorItems = orderItems.filter(
			(item) => item.xitem_memberId !== user?.userId && !ownerAddressesById[item.addressId]
		);

		if (contributorItems.length) {
			const ownerShippingMethods = isEmpty(ownerItems)
				? getUniqueShippingMethods(usableShipping, orderItems).map(
						({ shipModeId }) => shipModeId as string
				  )
				: uniqBy(ownerItems, 'shipModeId')
						.filter(({ shipModeCode }) => shipModeCode !== SHIP_MODE_CODE_PICKUP)
						.map(({ shipModeId }) => shipModeId);

			return {
				ownerItems,
				ownerAddresses,
				ownerShippingMethods,
				contributorItems,
			};
		}
	}
};

export const fetchSharedOrderShippingData = (
	orderTypeCode: string,
	inputUsableShipping: CartUsableShippingInfo | undefined,
	orderItems: OrderItem[],
	user: User | undefined
) => {
	const usableShipping = consolidateOrderShipping(
		orderTypeCode,
		inputUsableShipping,
		orderItems,
		user
	);
	const sharedOrderData = getActionableContributors(
		orderTypeCode,
		inputUsableShipping,
		orderItems,
		user
	);
	return { usableShipping, sharedOrderData };
};
