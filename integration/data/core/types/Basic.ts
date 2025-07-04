/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

export type ID = string | number;
export type StateObject = Record<string, any>;

export type TransactionError = {
	errorKey: string;
	errorParameters: string;
	errorMessage: string;
	errorCode: string;
};
export type ElasticSearchError = {
	code: string;
	message: string;
};
export type TransactionErrorResponse = Response & {
	error: {
		errors: TransactionError[];
	};
};
export type ElasticSearchErrorResponse = Response & {
	error: ElasticSearchError;
};

export type InventoryPBCError = {
	code: string;
	locale: string;
	message: string;
	messageKey: string;
	messageArguments: string[];
};
