/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */

import { Dialog } from '@/components/blocks/Dialog';
import { useRecurringOrders } from '@/data/Content/RecurringOrders';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import { useUser } from '@/data/User';
import { Button, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
export interface ConfirmationDialogRawProps {
	id: string;
	orderId: string;
	subscriptionId: string;
	keepMounted: boolean;
	open: boolean;
	frequency: any;
	onCloseDialog: (value?: string) => void;
}
const cancelRecurringOrderNoticePeriod = 12;

export const RecurringOrdersTablePopUp = (props: ConfirmationDialogRawProps) => {
	const { onCloseDialog, open, orderId, subscriptionId, frequency } = props;
	const { user } = useUser();
	const { handlerConfirm } = useRecurringOrders(user?.userId as string);
	const SignInNLS = useLocalization('Confirmation');
	const [message, setMessage] = useState('');
	const dateFormatter = useDateTimeFormat();
	useEffect(() => {
		setMessage(SignInNLS.ScheduleOrderCancel.t());
		if (frequency?.nextOccurence) {
			const hours =
				(new Date(frequency?.nextOccurence).getTime() - new Date().getTime()) / 60 / 60 / 1000;
			if (hours > 0 && hours < cancelRecurringOrderNoticePeriod) {
				const date = dateFormatter.format(new Date(frequency?.nextOccurence));
				setMessage(SignInNLS.ScheduleOrderCancelNotification.t({ next: date as string }));
			}
		}
	}, [open, frequency, dateFormatter, SignInNLS]);

	const closeCancelRecurringOrderDialog = useCallback(() => {
		onCloseDialog();
	}, [onCloseDialog]);

	const onCancelRecurringOrderDialogSubmit = useCallback(async () => {
		await handlerConfirm(orderId, subscriptionId);
		onCloseDialog();
	}, [handlerConfirm, orderId, subscriptionId, onCloseDialog]);

	return (
		<Dialog
			open={open}
			title={SignInNLS.CancelRecurringOrder.t()}
			content={<Typography>{message}</Typography>}
			actions={
				<>
					<Button variant="outlined" onClick={closeCancelRecurringOrderDialog}>
						{SignInNLS.CancelButton.t()}
					</Button>
					<Button variant="contained" onClick={onCancelRecurringOrderDialogSubmit}>
						{SignInNLS.SubmitButton.t()}
					</Button>
				</>
			}
			onClose={closeCancelRecurringOrderDialog}
		/>
	);
};
