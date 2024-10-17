/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	getSubscriptionEnd,
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

export const OrderDetailsV2RecurringOrderDetails: FC = () => {
	const recurringOrderInfoNLS = useLocalization('RecurringOrderInfo');
	const Order = useLocalization('Order');
	const commerceEnvironmentNLS = useLocalization('CommerceEnvironment');
	const dateFormatter = useDateTimeFormat();
	const { order, toggle } = useContext(ContentContext) as { order: Order; toggle: () => void };
	const { recurringOrderInfo } = useRecurringOrderState();
	const { startDate: sessionDate, endDate: sessionEndDate, frequency } = recurringOrderInfo;
	const isSub = useMemo(() => order?.orderTypeCode === ORDER_TYPE.RECURRING, [order]);
	const { subscription } = useRecurringOrderDetails();

	const startDateDisplay = useMemo(() => {
		const date = !isSub ? sessionDate : getSubscriptionStart(subscription);
		return date ? dateFormatter.format(new Date(date)) : Order.NotAvailable.t();
	}, [dateFormatter, isSub, Order, sessionDate, subscription]);

	const endDateDisplay = useMemo(() => {
		const date = !isSub ? sessionEndDate : getSubscriptionEnd(subscription);
		return date ? dateFormatter.format(new Date(date)) : Order.NotAvailable.t();
	}, [isSub, sessionEndDate, subscription, dateFormatter, Order]);

	const frequencyDisplay = useMemo(() => {
		let schedule;
		if (isSub) {
			schedule = getSubscriptionFrequency(subscription, Order);
		} else {
			const found = RECURRING_ORDER_OPTIONS.find(({ value }) => frequency === value)?.value;
			if (found) {
				schedule =
					commerceEnvironmentNLS.recurringOrderFrequency[
						found as keyof typeof commerceEnvironmentNLS.recurringOrderFrequency
					].t();
			}
		}
		return schedule ?? Order.NotAvailable.t();
	}, [commerceEnvironmentNLS, Order, frequency, isSub, subscription]);

	const nextDeliveryDisplay = useMemo(() => {
		const next = isSub ? getSubscriptionNextDelivery(subscription, dateFormatter) : undefined;
		return isSub && next ? next : Order.NotAvailable.t();
	}, [Order.NotAvailable, dateFormatter, isSub, subscription]);

	return (
		<>
			{isSub ? (
				<Grid item xs={12}>
					<Button variant="outlined" onClick={toggle}>
						{recurringOrderInfoNLS.Labels.OrderHistoryButton.t({ orderId: order.orderId })}
					</Button>
				</Grid>
			) : null}

			{frequencyDisplay ? (
				<Grid item xs={12} sm={6} md={4}>
					<Typography variant="overline" gutterBottom>
						{recurringOrderInfoNLS.Labels.OrderSchedule.t()}
					</Typography>
					<Typography>{frequencyDisplay}</Typography>
				</Grid>
			) : null}

			{isSub ? (
				<Grid item xs={12} sm={6} md={8}>
					<Typography variant="overline" gutterBottom>
						{recurringOrderInfoNLS.Labels.RecurringOrderNumber.t()}
					</Typography>
					<Typography>{order.orderId}</Typography>
				</Grid>
			) : null}

			{startDateDisplay ? (
				<Grid item xs={12} sm={6} md={4}>
					<Typography variant="overline" gutterBottom>
						{recurringOrderInfoNLS.Labels.StartDate.t()}
					</Typography>
					<Typography>{startDateDisplay}</Typography>
				</Grid>
			) : null}

			{endDateDisplay ? (
				<Grid item xs={12} sm={6} md={4}>
					<Typography variant="overline" gutterBottom>
						{recurringOrderInfoNLS.Labels.EndDate.t()}
					</Typography>
					<Typography>{endDateDisplay}</Typography>
				</Grid>
			) : null}

			{isSub ? (
				<Grid item xs={12} sm={6} md={8}>
					<Typography variant="overline" gutterBottom>
						{recurringOrderInfoNLS.Labels.NextDelivery.t()}
					</Typography>
					<Typography>{nextDeliveryDisplay}</Typography>
				</Grid>
			) : null}
		</>
	);
};
