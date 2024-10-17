/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Order } from '@/data/types/Order';

export type StoreLocatorBaseProps = {
	order?: Order;
	embedded?: boolean;
};
