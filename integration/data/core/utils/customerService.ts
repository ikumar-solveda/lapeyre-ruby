/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	PARENT_IFRAME,
	SESSION_ERROR_ACTION,
	LOCK_ORDER_ACTION,
	LOCK_ORDER_ERROR,
} from '@/data/constants/customerService';

export const handleForUserSessionError = (errorMsgKey: string) => {
	const parentIFrame: any = window[PARENT_IFRAME];
	if (parentIFrame) {
		const sessionError = {
			msgKey: `SessionError.${errorMsgKey}`,
			className: 'error',
		};
		parentIFrame.sendMessage(
			{
				type: SESSION_ERROR_ACTION,
				payload: { sessionError },
			},
			window.location.origin
		);
		return true;
	} else {
		return false;
	}
};
export const handleLockOrderError = (error: any) => {
	const parentIFrame: any = window[PARENT_IFRAME];
	if (parentIFrame) {
		// dispatch(RESET_ERROR_ACTION());
		parentIFrame.sendMessage(
			{
				type: LOCK_ORDER_ACTION,
				payload: error,
			},
			window.location.origin
		);
		return true;
	} else {
		return false;
	}
};

export const isOrderLockError = (error: any) => {
	if (PARENT_IFRAME in window) {
		return LOCK_ORDER_ERROR.includes(error.errorKey);
	} else {
		return false;
	}
};
