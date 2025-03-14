/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { Linkable } from '@/components/blocks/Linkable';
import { OrderDetailsV2 } from '@/components/blocks/OrderDetailsV2';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { RecurringOrderHistory } from '@/components/content/RecurringOrderHistory';
import { useOrderHistoryDetailsV2 } from '@/data/Content/OrderHistoryDetailsV2';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { ArrowBackIos } from '@mui/icons-material';
import { Grid, Paper, Typography } from '@mui/material';
import { groupBy } from 'lodash';
import { FC, useCallback, useMemo, useState } from 'react';

const ROUTE_ID = 'back';

export const OrderHistoryDetails: FC<{ id: ID }> = () => {
	const { order, pickupOrderItems, deliveryOrderItems, orderId } = useOrderHistoryDetailsV2();
	const labels = useLocalization('Order');
	const routes = useLocalization('Routes');
	const statusText = `Status_${order?.orderStatus}` as keyof typeof labels;
	const formatter = useDateTimeFormat();
	const orderDate = useMemo(
		() => (order?.placedDate ? formatter.format(new Date(order?.placedDate)) : ''),
		[formatter, order]
	);

	const loading = orderId && !order;
	const oStatus = labels[statusText]?.t(undefined as any) ?? '';
	const grpSize = Object.keys(
		groupBy(pickupOrderItems.concat(deliveryOrderItems), 'orderItemStatus')
	).length;
	const statusDisp = grpSize <= 1 ? oStatus : labels.multiStatus.t();
	const router = useNextRouter();
	const { subscriptionId } = router.query;

	const [showRecurringHistory, setShowRecurringHistory] = useState<boolean>(false);
	const toggle = useCallback(() => {
		setShowRecurringHistory((prev) => !prev);
		scrollTo(0, 0);
	}, []);
	const [route, onClick, type] = useMemo(
		() =>
			showRecurringHistory
				? [undefined, toggle, 'inline']
				: [routes[subscriptionId ? 'RecurringOrders' : 'OrderHistory'].route.t(), null, 'link'],
		[subscriptionId, routes, showRecurringHistory, toggle]
	);

	return (
		<Paper sx={{ p: 2 }}>
			{loading ? (
				<ProgressIndicator />
			) : (
				<Grid container spacing={2}>
					<Grid item xs={12} sm={4} container alignItems="center">
						<Linkable
							type={type as any}
							href={route}
							onClick={onClick}
							id={ROUTE_ID}
							data-testid={ROUTE_ID}
							aria-label={showRecurringHistory ? labels.OrderDetails.t() : labels.BackToOH.t()}
						>
							<ArrowBackIos />
						</Linkable>

						<Typography variant="pageTitle">{labels.OrderDetails.t()}</Typography>
					</Grid>
					<Grid item xs={12} sm={2}>
						<Typography variant="overline" display="block">
							{labels.OrderNumber.t()}
						</Typography>
						<Typography variant="body2" component="span" display="block">
							{orderId}
						</Typography>
					</Grid>
					{order.placedDate ? (
						<Grid item xs={12} sm={2}>
							<Typography variant="overline" display="block">
								{labels.OrderDate.t()}
							</Typography>
							<Typography variant="body2" display="block">
								{orderDate}
							</Typography>
						</Grid>
					) : null}
					<Grid item xs={12} sm={4}>
						<Typography variant="overline" display="block">
							{labels.Status.t()}
						</Typography>
						<Typography variant="body2" display="block">
							{statusDisp}
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<ContentProvider value={{ toggle }}>
							{showRecurringHistory ? (
								<RecurringOrderHistory order={order} />
							) : (
								<OrderDetailsV2
									order={order}
									pickupOrderItems={pickupOrderItems}
									deliveryOrderItems={deliveryOrderItems}
									heading={
										<Typography variant="h5" textTransform="capitalize">
											{labels.Items.t()}
										</Typography>
									}
								/>
							)}
						</ContentProvider>
					</Grid>
				</Grid>
			)}
		</Paper>
	);
};
