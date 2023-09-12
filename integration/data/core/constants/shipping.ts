/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { OrderItem } from '@/data/types/Order';

export const MULTIPLE_SHIPMENT_ID_PREFIX = 'multi-shipment';
export type ShippingTableData = {
	orderItemId: string;
	itemDetails: { partNumber: string; contractId?: string };
	quantity: { quantity: number };
	shippingDetails: { item: OrderItem };
};
