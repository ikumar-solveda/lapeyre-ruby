/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { OrderDetailsRecurringOrderDetails } from '@/components/blocks/OrderDetails/parts/RecurringOrderDetails';
import { OrderDetailsRecurringOrderIcon } from '@/components/blocks/OrderDetails/parts/RecurringOrderIcon';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { ORDER_STATUS } from '@/data/constants/order';
import { ContentContext } from '@/data/context/content';
import { useRecurringOrderState } from '@/data/state/useRecurringOrderState';
import { Order } from '@/data/types/Order';
import { Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';

/** @deprecated  see `OrderDetailsV2` */
export const OrderDetailsSectionHeading: FC = () => {
	const labels = useLocalization('OrderDetails').Labels;
	const { order } = useContext(ContentContext) as { order?: Order };
	const { recurringOrderInfo } = useRecurringOrderState();
	const { isRecurring } = recurringOrderInfo;
	const router = useNextRouter();
	const subscriptionId = router.query?.subscriptionId as string;
	return (
		<Grid container alignContent="center">
			<Grid item xs={12} md={5}>
				<Typography variant="h4">{labels.OrderSummary.t()}</Typography>
			</Grid>
			{(order?.orderStatus === ORDER_STATUS.PendingOrder && isRecurring) || subscriptionId ? (
				<>
					<Grid item xs={12} md={3}>
						<OrderDetailsRecurringOrderIcon />
					</Grid>
					<Grid item xs={12} md={4} container spacing={1}>
						<OrderDetailsRecurringOrderDetails />
					</Grid>
				</>
			) : null}
		</Grid>
	);
};
