/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, createContext, useState, PropsWithChildren } from 'react';
import { SnackbarOrigin } from '@mui/material';
import { noop } from 'lodash';

export type NotificationMessageOptionsType = {
	severity?: 'error' | 'info' | 'success' | 'warning';
	anchorOrigin?: SnackbarOrigin;
};

export type NotificationText = string | JSX.Element | JSX.Element[];

type NotificationMessageType = NotificationMessageOptionsType & {
	text: NotificationText;
	isAddToCart?: boolean;
};

export type NotificationsContextType = {
	message: NotificationMessageType;
	setMessage: (message: NotificationMessageType) => void;
};

export const NotificationsContext = createContext<NotificationsContextType>({
	message: { text: '' },
	setMessage: noop,
});

export const NotificationsProvider: FC<PropsWithChildren> = ({ children }) => {
	const [message, setMessage] = useState<NotificationMessageType>({
		text: '',
	});

	return (
		<NotificationsContext.Provider value={{ message, setMessage }}>
			{children}
		</NotificationsContext.Provider>
	);
};
