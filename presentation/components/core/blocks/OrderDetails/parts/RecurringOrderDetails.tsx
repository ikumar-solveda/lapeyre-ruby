/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	getSubscriptionFrequency,
	getSubscriptionNextDelivery,
	getSubscriptionStart,
	useRecurringOrderDetails,
} from '@/data/Content/RecurringOrderDetails';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import { ORDER_TYPE } from '@/data/constants/order';
import { RECURRING_ORDER_OPTIONS } from '@/data/constants/recurringOrder';
import { ContentContext } from '@/data/context/content';
import { useRecurringOrderState } from '@/data/state/useRecurringOrderState';
import { Order } from '@/data/types/Order';
import { Button, Grid, Typography } from '@mui/material';
import { FC, useContext, useMemo } from 'react';

/** @deprecated  see `OrderDetailsV2` */
export const OrderDetailsRecurringOrderDetails: FC = () => {
	const labels = useLocalization('RecurringOrderInfo').Labels;
	const Order = useLocalization('Order');
	const Frequencies = useLocalization('CommerceEnvironment').recurringOrderFrequency;
	const dateFormatter = useDateTimeFormat();
	const { order, toggle } = useContext(ContentContext) as { order: Order; toggle: () => void };
	const { recurringOrderInfo } = useRecurringOrderState();
	const { startDate: sessionDate, frequency } = recurringOrderInfo;
	const isSub = useMemo(() => order?.orderTypeCode === ORDER_TYPE.RECURRING, [order]);
	const { subscription } = useRecurringOrderDetails();

	const startDateDisplay = useMemo(() => {
		const date = !isSub ? sessionDate : getSubscriptionStart(subscription);
		return date ? dateFormatter.format(new Date(date)) : Order.NotAvailable.t();
	}, [dateFormatter, isSub, Order.NotAvailable, sessionDate, subscription]);

	const frequencyDisplay = useMemo(() => {
		let schedule;
		if (isSub) {
			schedule = getSubscriptionFrequency(subscription, Order);
		} else {
			const found = RECURRING_ORDER_OPTIONS.find(({ value }) => frequency === value)?.value;
			if (found) {
				schedule = Frequencies[found as keyof typeof Frequencies].t();
			}
		}
		return schedule ?? Order.NotAvailable.t();
	}, [Frequencies, Order, frequency, isSub, subscription]);

	const nextDeliveryDisplay = useMemo(() => {
		const next = isSub ? getSubscriptionNextDelivery(subscription, dateFormatter) : undefined;
		return isSub && next ? next : Order.NotAvailable.t();
	}, [Order.NotAvailable, dateFormatter, isSub, subscription]);

	return (
		<>
			{isSub ? (
				<Grid item xs={12}>
					<Button variant="outlined" onClick={toggle}>
						{labels.OrderHistoryButton.t({ orderId: order.orderId })}
					</Button>
				</Grid>
			) : null}

			{frequencyDisplay ? (
				<Grid item xs={12} sm={6} md={4}>
					<Typography variant="overline" gutterBottom>
						{labels.OrderSchedule.t()}
					</Typography>
					<Typography>{frequencyDisplay}</Typography>
				</Grid>
			) : null}

			{isSub ? (
				<Grid item xs={12} sm={6} md={8}>
					<Typography variant="overline" gutterBottom>
						{labels.RecurringOrderNumber.t()}
					</Typography>
					<Typography>{order.orderId}</Typography>
				</Grid>
			) : null}

			{startDateDisplay ? (
				<Grid item xs={12} sm={6} md={4}>
					<Typography variant="overline" gutterBottom>
						{labels.StartDate.t()}
					</Typography>
					<Typography>{startDateDisplay}</Typography>
				</Grid>
			) : null}

			{isSub ? (
				<Grid item xs={12} sm={6} md={8}>
					<Typography variant="overline" gutterBottom>
						{labels.NextDelivery.t()}
					</Typography>
					<Typography>{nextDeliveryDisplay}</Typography>
				</Grid>
			) : null}
		</>
	);
};
