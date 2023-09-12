/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	COOKIE_ERRORS,
	ERROR_TYPE,
	INVALID_COOKIE_ERROR_KEY,
	PARTIAL_AUTHENTICATION_ERROR_CODE,
	PARTIAL_AUTHENTICATION_ERROR_KEY,
	TIMEOUT_ERRORS,
} from '@/data/constants/errors';
import {
	ElasticSearchError,
	ElasticSearchErrorResponse,
	TransactionError,
	TransactionErrorResponse,
} from '@/data/types/Basic';
import { ErrorType } from '@/data/types/Error';

const processCommonTransactionError = (error: TransactionError): ErrorType => {
	const messageKey =
		error.errorCode && error.errorCode !== error.errorKey
			? error.errorKey + '_' + error.errorCode
			: error.errorKey;
	const errorParameters =
		typeof error.errorParameters === 'string'
			? error.errorParameters.split(',')
			: error.errorParameters;
	const errorMessage = error.errorMessage;
	return {
		type: 'common-error',
		messageKey,
		errorParameters,
		errorMessage,
		error,
	};
};

const processElasticSearchError = (error: ElasticSearchError): ErrorType => {
	if (COOKIE_ERRORS[error.code]) {
		return {
			type: 'session-error',
			titleKey: 'InvalidTitle',
			messageKey: 'InvalidMsg',
			error: {
				errorKey: INVALID_COOKIE_ERROR_KEY,
				errorParameters: '',
				errorMessage: error.message,
				errorCode: 'CMN1039E',
			},
		};
	} else {
		return processCommonTransactionError({
			errorCode: error.code,
			errorMessage: error.message,
			errorKey: error.code,
			errorParameters: '',
		});
	}
};
const processTransactionError = (error: TransactionError): ErrorType => {
	if (TIMEOUT_ERRORS[error.errorCode] || TIMEOUT_ERRORS[error.errorKey]) {
		return {
			type: 'session-error',
			titleKey: 'TimeoutTitle',
			messageKey: 'TimeoutMsg',
			error,
		};
	} else if (
		COOKIE_ERRORS[error.errorCode] ||
		COOKIE_ERRORS[error.errorKey] ||
		error.errorKey.startsWith(INVALID_COOKIE_ERROR_KEY)
	) {
		return {
			type: 'session-error',
			titleKey: 'InvalidTitle',
			messageKey: 'InvalidMsg',
			error,
		};
	} else if (
		error.errorCode === PARTIAL_AUTHENTICATION_ERROR_CODE ||
		error.errorKey === PARTIAL_AUTHENTICATION_ERROR_KEY
	) {
		return {
			type: 'session-error',
			titleKey: 'GenericTitle',
			messageKey: 'PartialAuthError',
			error,
		};
	} else {
		return processCommonTransactionError(error);
	}
};

export const isErrorType = (error: ErrorType | any): error is ErrorType =>
	error?.type &&
	(error.type === ERROR_TYPE.common ||
		error.type === ERROR_TYPE.session ||
		error.type === ERROR_TYPE.shippingInfo);

export const processError = (
	errorResponse: TransactionErrorResponse | ElasticSearchErrorResponse
): ErrorType | TransactionErrorResponse => {
	const unknownResponse: any = errorResponse;
	const tsError: TransactionError | undefined = unknownResponse?.error?.errors?.at(0);
	const esError: ElasticSearchError = unknownResponse?.error;

	if (tsError) {
		return processTransactionError(tsError);
	} else if (esError?.code) {
		return processElasticSearchError(esError);
	} else {
		return unknownResponse;
	}
};
