/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OrderDetailsV2ShippingMulti } from '@/components/blocks/OrderDetailsV2/parts/ShippingMulti';
import { OrderDetailsV2ShippingSingle } from '@/components/blocks/OrderDetailsV2/parts/ShippingSingle';
import { OrderItem } from '@/data/types/Order';
import { groupBy } from 'lodash';
import { FC, useMemo } from 'react';

export const OrderDetailsV2Delivery: FC<{ deliveryOrderItems: OrderItem[] }> = ({
	deliveryOrderItems,
}) => {
	const groups = useMemo(
		() => Object.values(groupBy(deliveryOrderItems, (item) => [item.addressId, item.shipModeId])),
		[deliveryOrderItems]
	);

	return groups.length === 1 ? (
		<OrderDetailsV2ShippingSingle deliveryOrderItems={deliveryOrderItems} />
	) : groups.length > 1 ? (
		<OrderDetailsV2ShippingMulti groups={groups} />
	) : null;
};
