/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { StoreDetails } from '@/data/types/Store';

export const INVENTORY_STATUS = {
	AVAILABLE: 'Available',
	UNAVAILABLE: 'Unavailable',
	ALLOCATED: 'Allocated',
	UNALLOCATED: 'Unallocated',
	BACK_ORDERED: 'Backordered',
	OUT_OF_STOCK: 'OOS',
	NOT_AVAILABLE: 'NA',
};

export const INVENTORY_PBC_STATUS = {
	available: 'available',
	out_of_stock: 'out_of_stock',
	below_threshold: 'below_threshold',
	above_threshold: 'above_threshold',
};

export const AVAILABLE_STATUSES = {
	[INVENTORY_STATUS.AVAILABLE]: true,
	[INVENTORY_STATUS.BACK_ORDERED]: true,
	[INVENTORY_PBC_STATUS.available]: true,
	[INVENTORY_PBC_STATUS.above_threshold]: true,
	[INVENTORY_PBC_STATUS.below_threshold]: true,
};

export const INVENTORY_PBC = 'hcl.inventory.pbc.enabled';
export const INVENTORY_PBC_EXT_FFM_ID = 'hcl.inventory.pbc.defaultFulfillmentCenterExtId';
export const ONLINE_STORE_KEY = 'Online';

/**
 * Use this to initialize an "empty" store where store-locator is to be used -- this object can then
 *   be compared against (strict equality comparison) to detect whether the store-locator
 *   initialization is complete, i.e., initialization is complete when the target object does not
 *   equal this one
 */
export const UNINITIALIZED_STORE = {} as StoreDetails;

export const INVENTORY_DEDUPING_INTERVAL = 10_000; // 10 seconds
