/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getInventoryRecord, hasInStock } from '@/data/Content/_Inventory';
import { dFix } from '@/data/Settings';
import { BundleTableRowData } from '@/data/types/Product';
import { ProductAvailabilityData } from '@/data/types/ProductAvailabilityData';

/**
 *
 * @param inventories all inventories for bundle
 * @param partNumber partNumber to validate
 * @param quantity quantity of selection (assert > 0)
 * @param store store to check against
 * @returns object with boolean attributes that are true on given conditions:
 * 					`oos` if no availability for partNumber;
 * 					`notMuch` if no availability or quantity larger than available
 */
const getStatuses = (
	inventories: ProductAvailabilityData[],
	partNumber: string,
	quantity: number,
	store?: string
) => {
	const inventory = getInventoryRecord(inventories, partNumber, store);
	const status = hasInStock(inventory);
	const oos = !status;
	const notMuch = !status || dFix(inventory.availableQuantity ?? 0, 0) < quantity;
	return { oos, notMuch };
};

const validateSkuInventory = (
	availability: ProductAvailabilityData[],
	partNumber: string,
	quantity: number,
	store: string
) => {
	let oos = false;
	let notMuch = false;

	const { oos: onlineOOS, notMuch: onlineNotMuch } = getStatuses(
		availability,
		partNumber,
		quantity
	);

	if (onlineOOS || onlineNotMuch) {
		oos = onlineOOS;
		notMuch = onlineNotMuch;

		if (store) {
			const { oos: offlineOOS, notMuch: offlineNotMuch } = getStatuses(
				availability,
				partNumber,
				quantity,
				store
			);
			oos = onlineOOS && offlineOOS;
			notMuch = onlineNotMuch && offlineNotMuch;
		}
	}

	return { oos, notMuch };
};

export const validateBundleSelections = (data: BundleTableRowData[], store: string) => {
	let someWithNoSkus = false;
	let someWithNoAvl = false;
	let someWithNotEnough = false;

	data
		.filter(({ quantity }) => dFix(quantity, 0) > 0)
		.forEach((r) => {
			const { quantity: q, isOneSku, selectedSku, availability } = r;
			const quantity = dFix(q, 0);

			if (isOneSku || selectedSku) {
				const { partNumber } = selectedSku ?? r;
				const { oos, notMuch } = validateSkuInventory(availability, partNumber, quantity, store);
				someWithNoAvl = someWithNoAvl || oos;
				someWithNotEnough = someWithNotEnough || notMuch;
			} else {
				someWithNoSkus = true;
			}
		});

	const count = data.map(({ quantity: q }) => dFix(q, 0)).reduce((total, q) => total + q, 0);

	return {
		noItems: 0 === count,
		someWithNoSkus,
		someWithNoAvl,
		someWithNotEnough,
	};
};
