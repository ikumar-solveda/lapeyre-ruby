/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import React, { FC, useMemo } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useLocalization } from '@/data/Localization';
import { Linkable } from '@/components/blocks/Linkable';
import { ID } from '@/data/types/Basic';
import { ProgressIndicator } from '@/components/blocks/ProgressIndicator';
import { useOrderHistoryDetails } from '@/data/Content/OrderHistoryDetails';
import { groupBy } from 'lodash';
import { ArrowBackIos } from '@mui/icons-material';
import { OrderDetails } from '@/components/blocks/OrderDetails';

export const OrderHistoryDetails: FC<{ id: ID }> = () => {
	const { order, orderItems, orderId, locale } = useOrderHistoryDetails();
	const labels = useLocalization('Order');
	const routes = useLocalization('Routes');
	const statusText = `Status_${order?.orderStatus}` as keyof typeof labels;
	const orderDate = useMemo(
		() =>
			order?.placedDate
				? new Intl.DateTimeFormat(locale, {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
				  }).format(new Date(order?.placedDate))
				: '',
		[locale, order]
	);

	const loading = orderId && !order;
	const oStatus = labels[statusText]?.t(undefined as any) ?? '';
	const grpSize = Object.keys(groupBy(orderItems ?? [], 'orderItemStatus')).length;
	const statusDisp = grpSize <= 1 ? oStatus : labels.multiStatus.t();

	return (
		<Paper sx={{ p: 2 }}>
			{loading ? (
				<ProgressIndicator />
			) : (
				<Grid container spacing={2}>
					<Grid item xs={12} sm={4} container alignItems="center">
						<Linkable href={routes.OrderHistory.route.t()} aria-label={labels.BackToOH.t()}>
							<ArrowBackIos />
						</Linkable>
						<Typography variant="h3" component="div">
							{labels.OrderDetails.t()}
						</Typography>
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
						<OrderDetails order={order} orderItems={orderItems} showHeading={false} />
					</Grid>
				</Grid>
			)}
		</Paper>
	);
};
