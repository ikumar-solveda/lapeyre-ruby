/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export type ID = string | number;
export type StateObject = Record<string, any>;

export type TransactionError = {
	errorKey: string;
	errorParameters: string;
	errorMessage: string;
	errorCode: string;
};
export type TransactionErrorResponse = Response & {
	error: {
		errors: TransactionError[];
	};
};
