/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import { OrderItem } from '@/data/types/Order';

export const filterOrderItemByPickup = (item: OrderItem) =>
	item.shipModeCode === SHIP_MODE_CODE_PICKUP;
