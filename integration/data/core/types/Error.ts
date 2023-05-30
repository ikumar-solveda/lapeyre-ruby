/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TransactionError } from '@/data/types/Basic';

export type ErrorType = {
	type: 'common-error' | 'session-error';
	titleKey?: string;
	messageKey: string;
	errorParameters?: (string | number)[];
	errorMessage?: string;
	error: TransactionError;
};

export type SessionErrorType = Omit<ErrorType, 'type'> & {
	type: 'session-error';
};
