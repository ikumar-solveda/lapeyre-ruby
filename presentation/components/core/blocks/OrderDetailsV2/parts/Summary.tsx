/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OrderDetailsV2GridDisplay } from '@/components/blocks/OrderDetailsV2/parts/GridDisplay';
import { orderDetailsV2SummaryGridItem } from '@/components/blocks/OrderDetailsV2/styles/summaryGridItem';
import { OrderPromotionsSummary } from '@/components/blocks/OrderPromotionsSummary';
import { OrderTotalSummary } from '@/components/blocks/OrderTotalSummary';
import { ContentContext } from '@/data/context/content';
import { Order } from '@/data/types/Order';
import { FC, useContext } from 'react';

export const OrderDetailsV2Summary: FC = () => {
	const { order } = useContext(ContentContext) as { order: Order };

	return (
		<OrderDetailsV2GridDisplay
			justifyContent={order.adjustment ? 'space-between' : 'flex-end'}
			gridItemProps={orderDetailsV2SummaryGridItem}
		>
			{order.adjustment ? <OrderPromotionsSummary /> : null}
			<OrderTotalSummary />
		</OrderDetailsV2GridDisplay>
	);
};
