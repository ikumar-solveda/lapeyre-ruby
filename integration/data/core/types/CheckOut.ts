/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export type CHECK_OUT_STEP = 'shipping' | 'payment' | 'review';
export type BOPIS_CHECK_OUT_STEP = 'pickup-store' | 'pickup' | 'payment' | 'review';
export { type NonSelfPickupType, type SelfPickupType } from '@/data/types/Pickup';
export type BopisRequestOrderItem = {
	orderItemId?: string;
	/** Physical mode identifier. */
	physicalStoreId?: string;
	/** Shipping mode identifier. */
	shipModeId: string | undefined;
	/** Shipping instructions. */
	shipInstructions?: string;
};

export type BopisRequestBody = {
	/** A list of order items. */
	orderItem: BopisRequestOrderItem[];
	/** Shipping mode identifier. */
	shipModeId?: string;
	/** Address identifier. */
	addressId?: string;
	/** Physical mode identifier. */
	physicalStoreId?: string;
};
