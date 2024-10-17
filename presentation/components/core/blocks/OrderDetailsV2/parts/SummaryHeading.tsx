/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { OrderDetailsV2RecurringOrderDetails } from '@/components/blocks/OrderDetailsV2/parts/RecurringOrderDetails';
import { OrderDetailsV2RecurringOrderIcon } from '@/components/blocks/OrderDetailsV2/parts/RecurringOrderIcon';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { ORDER_STATUS } from '@/data/constants/order';
import { ContentContext } from '@/data/context/content';
import { useRecurringOrderState } from '@/data/state/useRecurringOrderState';
import { Order } from '@/data/types/Order';
import { Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';

export const OrderDetailsV2SummaryHeading: FC = () => {
	const orderDetailsNLS = useLocalization('OrderDetails');
	const { order } = useContext(ContentContext) as { order?: Order };
	const { recurringOrderInfo } = useRecurringOrderState();
	const { isRecurring } = recurringOrderInfo;
	const router = useNextRouter();
	const subscriptionId = router.query?.subscriptionId as string;

	return (
		<Grid container alignContent="center">
			<Grid item xs={12} md={5} lg={12}>
				<Typography variant="h5">{orderDetailsNLS.Labels.OrderSummary.t()}</Typography>
			</Grid>
			{(order?.orderStatus === ORDER_STATUS.PendingOrder && isRecurring) || subscriptionId ? (
				<>
					<Grid item xs={12} md={3} lg={12}>
						<OrderDetailsV2RecurringOrderIcon />
					</Grid>
					<Grid item xs={12} md={4} container spacing={1} lg={12}>
						<OrderDetailsV2RecurringOrderDetails />
					</Grid>
				</>
			) : null}
		</Grid>
	);
};
