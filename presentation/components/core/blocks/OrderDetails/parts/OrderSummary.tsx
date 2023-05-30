/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { OrderDetailsGridDisplay } from '@/components/blocks/OrderDetails/parts/GridDisplay';
import { OrderPromotionsSummary } from '@/components/blocks/OrderPromotionsSummary';
import { OrderTotalSummary } from '@/components/blocks/OrderTotalSummary';
import { ContentContext } from '@/data/context/content';
import { Order } from '@/data/types/Order';
import { FC, useContext } from 'react';

export const OrderDetailsOrderSummary: FC = () => {
	const { order } = useContext(ContentContext) as { order: Order };

	return (
		<OrderDetailsGridDisplay justifyContent={order.adjustment ? 'space-between' : 'flex-end'}>
			{order.adjustment ? <OrderPromotionsSummary /> : null}
			<OrderTotalSummary />
		</OrderDetailsGridDisplay>
	);
};
