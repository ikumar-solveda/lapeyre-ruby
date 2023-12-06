/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useLocalizedErrorMessage } from '@/data/Localization';
import { ERROR_TYPE } from '@/data/constants/errors';
import {
	NotificationMessageOptionsType,
	NotificationText,
	NotificationsContext,
} from '@/data/context/notifications';
import { SessionErrorContext } from '@/data/context/sessionError';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ErrorType, SessionErrorType } from '@/data/types/Error';
import {
	handleForUserSessionError,
	handleLockOrderError,
	isOrderLockError,
} from '@/data/utils/customerService';
import { generateShippingInfoError } from '@/data/utils/generateShippingInfoError';
import { error as logError } from '@/data/utils/loggerUtil';
import { isErrorType } from '@/data/utils/processError';
import { useCallback, useContext } from 'react';

export const useNotifications = () => {
	const { message, setMessage } = useContext(NotificationsContext);
	const { setSessionError } = useContext(SessionErrorContext);
	const getLocalizedErrorMessage = useLocalizedErrorMessage();

	const showMessage = (message: NotificationText, options?: NotificationMessageOptionsType) => {
		setMessage({ text: message, ...options });
	};

	const showErrorMessage = (message: NotificationText) => {
		setMessage({ text: message, severity: 'error' });
	};

	const showSuccessMessage = (message: NotificationText, isAddToCart = false) => {
		setMessage({ text: message, severity: 'success', isAddToCart });
	};

	const clearMessage = () => {
		setMessage({ text: '' });
	};

	const notifyError = useCallback(
		(error: TransactionErrorResponse | ErrorType) => {
			if (isErrorType(error)) {
				if (error.type === ERROR_TYPE.session && !handleForUserSessionError(error.messageKey)) {
					setSessionError(error as SessionErrorType);
				} else if (error.type === ERROR_TYPE.shippingInfo) {
					setMessage({
						severity: 'error',
						...generateShippingInfoError({ text: getLocalizedErrorMessage(error) }),
					});
				} else if (!(isOrderLockError(error.error) && handleLockOrderError(error.error))) {
					setMessage({ text: getLocalizedErrorMessage(error), severity: 'error' });
				}
			} else {
				logError(undefined, 'Notifications: notifyError: error: %o', error);
			}
		},
		[getLocalizedErrorMessage, setMessage, setSessionError]
	);

	return {
		message,
		showMessage,
		showSuccessMessage,
		showErrorMessage,
		clearMessage,
		notifyError,
	};
};
