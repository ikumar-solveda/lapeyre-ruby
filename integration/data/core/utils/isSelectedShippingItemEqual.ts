/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import type { OrderItem } from '@/data/types/Order';

/**
 * The helper function determines whether two orderItems are equal including free gift.
 * @param itemA
 * @param itemB
 * @returns true if itemA and itemB have same orderItemId or itemA and itemB are same free gift.
 */
const isSameFreeGift = (itemA: OrderItem, itemB: OrderItem) => {
	if (
		itemA.freeGift.toUpperCase() === 'TRUE' &&
		itemA.freeGift === itemB.freeGift &&
		itemA.partNumber === itemB.partNumber
	) {
		const adjustmentsA = (itemA.adjustment ?? [])
			.map(({ code }) => code)
			.sort()
			.join();
		const adjustmentsB = (itemB.adjustment ?? [])
			.map(({ code }) => code)
			.sort()
			.join();
		// compare the adjustment codes. Same free gift means they have same adjustment code and same
		// partNumber.
		return adjustmentsA === adjustmentsB;
	} else {
		return false;
	}
};

export const isSelectedShippingItemEqual = (itemA: OrderItem, itemB: OrderItem) =>
	itemA.orderItemId === itemB.orderItemId || isSameFreeGift(itemA, itemB);
