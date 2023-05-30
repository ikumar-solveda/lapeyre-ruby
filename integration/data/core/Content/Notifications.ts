/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useCallback, useContext } from 'react';
import {
	NotificationsContext,
	NotificationMessageOptionsType,
	NotificationText,
} from '@/data/context/notifications';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ErrorType, SessionErrorType } from '@/data/types/Error';
import { SessionErrorContext } from '@/data/context/sessionError';
import { ERROR_TYPE } from '@/data/constants/errors';
import { useLocalizedErrorMessage } from '@/data/Localization';
import { isErrorType } from '@/data/utils/processError';
import {
	handleForUserSessionError,
	isOrderLockError,
	handleLockOrderError,
} from '@/data/utils/customerService';
import { generateShippingInfoError } from '@/data/utils/generateShippingInfoError';

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
				console.log(error);
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
