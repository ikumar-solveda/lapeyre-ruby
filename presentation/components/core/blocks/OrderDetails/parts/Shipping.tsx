/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { OrderDetailsPickup } from '@/components/blocks/OrderDetails/parts/Pickup';
import { OrderDetailsShippingMulti } from '@/components/blocks/OrderDetails/parts/ShippingMulti';
import { OrderDetailsShippingSingle } from '@/components/blocks/OrderDetails/parts/ShippingSingle';
import { SHIP_MODE_CODE_PICKUP } from '@/data/constants/order';
import { ContentContext } from '@/data/context/content';
import { OrderItem } from '@/data/types/Order';
import { groupBy } from 'lodash';
import { FC, useContext, useMemo } from 'react';

/** @deprecated  see `OrderDetailsV2` */
export const OrderDetailsShipping: FC<{ showHeading: boolean }> = ({ showHeading }) => {
	const { orderItems } = useContext(ContentContext) as { orderItems: OrderItem[] };
	const groups = useMemo(
		() => Object.values(groupBy(orderItems, (item) => [item.addressId, item.shipModeId])),
		[orderItems]
	);

	return groups.length === 1 ? (
		orderItems[0].shipModeCode === SHIP_MODE_CODE_PICKUP ? (
			<OrderDetailsPickup showHeading={showHeading} />
		) : (
			<OrderDetailsShippingSingle showHeading={showHeading} />
		)
	) : groups.length > 1 ? (
		<OrderDetailsShippingMulti {...{ groups }} />
	) : null;
};
