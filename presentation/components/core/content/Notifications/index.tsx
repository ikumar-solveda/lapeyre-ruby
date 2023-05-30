/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useNotifications } from '@/data/Content/Notifications';
import { snackBarSX } from '@/components/content/Notifications/styles/snackbar';
import { alertSX } from '@/components/content/Notifications/styles/alert';

export const Notifications: FC = () => {
	const { message, clearMessage } = useNotifications();

	return (
		<Snackbar
			open={message.text ? true : false}
			anchorOrigin={message.anchorOrigin ?? { vertical: 'bottom', horizontal: 'center' }}
			ClickAwayListenerProps={{
				onClickAway: clearMessage,
				mouseEvent: 'onMouseDown',
			}}
			sx={snackBarSX}
		>
			<Alert severity={message.severity ?? 'info'} onClose={clearMessage} sx={alertSX}>
				{message.text}
			</Alert>
		</Snackbar>
	);
};
