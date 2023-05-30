/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DELIVERY } from '@/data/constants/checkout';
import {
	BAD_INV_ERROR,
	BAD_INV_DELIVERY_ERROR_KEY,
	BAD_INV_PICKUP_ERROR_KEY,
	ERROR_TYPE,
} from '@/data/constants/errors';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ErrorType } from '@/data/types/Error';
import { processError } from '@/data/utils/processError';

export const processShippingInfoUpdateError = (
	errorResponse: TransactionErrorResponse,
	checkoutType: string = DELIVERY
): ErrorType | TransactionErrorResponse => {
	if (errorResponse?.error?.errors?.at(0)?.errorKey === BAD_INV_ERROR) {
		const errorMessage = {
			type: ERROR_TYPE.shippingInfo,
			messageKey: checkoutType === DELIVERY ? BAD_INV_DELIVERY_ERROR_KEY : BAD_INV_PICKUP_ERROR_KEY,
		} as ErrorType;
		return errorMessage;
	}
	return processError(errorResponse);
};
