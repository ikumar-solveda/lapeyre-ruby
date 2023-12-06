/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { recurringOrdersPopUpDialogIconSX } from '@/components/content/RecurringOrders/styles/popUpDialogIcon';
import { recurringOrdersPopUpBorderSX } from '@/components/content/RecurringOrders/styles/popupBorder';
import { recurringOrdersPopupDeleteIconSX } from '@/components/content/RecurringOrders/styles/popupDeleteIcon';
import { recurringOrdersPopUpPaddingSX } from '@/components/content/RecurringOrders/styles/popupPadding';
import { useRecurringOrders } from '@/data/Content/RecurringOrders';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { useLocalization } from '@/data/Localization';
import { useUser } from '@/data/User';
import CloseIcon from '@mui/icons-material/Close';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Icon,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
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
	}, [
		open,
		frequency,
		dateFormatter,
		SignInNLS.ScheduleOrderCancelNotification,
		SignInNLS.ScheduleOrderCancel,
	]);

	const closeCancelRecurringOrderDialog = () => {
		onCloseDialog();
	};

	const onCancelRecurringOrderDialogSubmit = async () => {
		await handlerConfirm(orderId, subscriptionId);
		onCloseDialog();
	};

	return (
		<Dialog sx={recurringOrdersPopupDeleteIconSX} maxWidth="xs" open={open}>
			<DialogTitle>
				{SignInNLS.CancelRecurringOrder.t()}
				<Icon sx={recurringOrdersPopUpDialogIconSX}>
					<CloseIcon onClick={closeCancelRecurringOrderDialog} />
				</Icon>
			</DialogTitle>

			<DialogContent sx={recurringOrdersPopUpBorderSX}>
				<Typography sx={recurringOrdersPopUpPaddingSX}>{message}</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeCancelRecurringOrderDialog}>{SignInNLS.CancelButton.t()}</Button>
				<Button onClick={onCancelRecurringOrderDialogSubmit}>{SignInNLS.SubmitButton.t()}</Button>
			</DialogActions>
		</Dialog>
	);
};
