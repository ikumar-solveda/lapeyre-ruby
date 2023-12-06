/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { ERR_CMD_INVALID_PARAM } from '@/data/constants/errors';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ErrorType } from '@/data/types/Error';
import { processError } from '@/data/utils/processError';

export const processBuyerRegistrationError = (
	originalError: TransactionErrorResponse
): ErrorType => {
	let rc = processError(originalError as TransactionErrorResponse) as ErrorType;
	const { error, errorParameters = [] } = rc;
	if (
		error.errorKey === ERR_CMD_INVALID_PARAM &&
		(errorParameters[0] === 'parentMember' || errorParameters[0] === 'parentMemberId')
	) {
		rc = { ...rc, messageKey: `${ERR_CMD_INVALID_PARAM}_${errorParameters[0]}` };
	}
	return rc;
};
