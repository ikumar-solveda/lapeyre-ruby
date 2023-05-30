/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TransactionErrorResponse, TransactionError } from '@/data/types/Basic';

export const extractResponseError = (error: TransactionErrorResponse) =>
	error?.error?.errors?.at(0);

export const isResponseError = (response: TransactionError | any): response is TransactionError =>
	(response as TransactionError).errorKey !== undefined;
