import {
	CartDeletePaymentInstruction,
	CartPaymentInstruction,
	ComIbmCommerceEdpBeansEDPSensitiveDataMaskHelperDataBeanIBMSensitiveDataMaskByPlainString,
	ComIbmCommerceRestOrderHandlerPaymentInstructionHandlerPaymentInstructionList,
	PaymentInstructionDeleteall,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class PaymentInstruction<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets payment instruction for the punch-out payment.
	 *
	 * @tags Payment Instruction
	 * @name PaymentInstructionGetPunchoutPaymentInfo
	 * @summary Get punch-out payment instructions
	 * @request GET:/store/{storeId}/cart/@self/payment_instruction/punchoutPaymentInfo
	 * @secure
	 * @response `200` `CartPaymentInstruction` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	paymentInstructionGetPunchoutPaymentInfo = (
		storeId: string,
		query: {
			/** The order identifier. */
			orderId: string;
			/** The payment instruction identifier. */
			piId: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The currency code to use for example, currency=USD. If no currency code is specified, the store default currency is used. */
			currency?:
				| 'JPY'
				| 'CNY'
				| 'BRL'
				| 'EUR'
				| 'RON'
				| 'RUB'
				| 'PLN'
				| 'USD'
				| 'KRW'
				| 'TWD'
				| 'CAD'
				| 'GBP';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('paymentInstructionGetPunchoutPaymentInfo'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'paymentInstructionGetPunchoutPaymentInfo',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartPaymentInstruction, void>({
			path: `/store/${storeId}/cart/@self/payment_instruction/punchoutPaymentInfo`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets payment instructions for the shopping cart.
	 *
	 * @tags Payment Instruction
	 * @name PaymentInstructionGetPaymentInfo
	 * @summary Get payment instructions
	 * @request GET:/store/{storeId}/cart/@self/payment_instruction
	 * @secure
	 * @response `200` `CartPaymentInstruction` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	paymentInstructionGetPaymentInfo = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The currency code to use for example, currency=USD. If no currency code is specified, the store default currency is used. */
			currency?:
				| 'JPY'
				| 'CNY'
				| 'BRL'
				| 'EUR'
				| 'RON'
				| 'RUB'
				| 'PLN'
				| 'USD'
				| 'KRW'
				| 'TWD'
				| 'CAD'
				| 'GBP';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('paymentInstructionGetPaymentInfo'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'paymentInstructionGetPaymentInfo',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartPaymentInstruction, void>({
			path: `/store/${storeId}/cart/@self/payment_instruction`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Updates a payment instruction in the shopping cart.
	 *
	 * @tags Payment Instruction
	 * @name PaymentInstructionUpdatePaymentInstruction
	 * @summary Update payment instructions
	 * @request PUT:/store/{storeId}/cart/@self/payment_instruction
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerPaymentInstructionHandlerPaymentInstructionList` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	paymentInstructionUpdatePaymentInstruction = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: CartPaymentInstruction,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails ||
				this.traceDetails.includes('paymentInstructionUpdatePaymentInstruction'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'paymentInstructionUpdatePaymentInstruction',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerPaymentInstructionHandlerPaymentInstructionList,
			void
		>({
			path: `/store/${storeId}/cart/@self/payment_instruction`,
			method: 'PUT',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Adds payment instructions to the shopping cart.
	 *
	 * @tags Payment Instruction
	 * @name PaymentInstructionAddPaymentInstruction
	 * @summary Add payment instructions
	 * @request POST:/store/{storeId}/cart/@self/payment_instruction
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerPaymentInstructionHandlerPaymentInstructionList` No response was specified.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	paymentInstructionAddPaymentInstruction = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: CartPaymentInstruction,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('paymentInstructionAddPaymentInstruction'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'paymentInstructionAddPaymentInstruction',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerPaymentInstructionHandlerPaymentInstructionList,
			void
		>({
			path: `/store/${storeId}/cart/@self/payment_instruction`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Deletes all payment instructions from the shopping cart.
	 *
	 * @tags Payment Instruction
	 * @name PaymentInstructionDeleteAllPaymentInstructions
	 * @summary Delete payment instructions
	 * @request DELETE:/store/{storeId}/cart/@self/payment_instruction
	 * @secure
	 * @response `200` `PaymentInstructionDeleteall` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	paymentInstructionDeleteAllPaymentInstructions = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails ||
				this.traceDetails.includes('paymentInstructionDeleteAllPaymentInstructions'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'paymentInstructionDeleteAllPaymentInstructions',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PaymentInstructionDeleteall, void>({
			path: `/store/${storeId}/cart/@self/payment_instruction`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets payment instructions for the shopping cart.
	 *
	 * @tags Payment Instruction
	 * @name CartSelfPaymentInstructionPaymentTokenDetail
	 * @summary fetch payment token data.
	 * @request GET:/store/{storeId}/cart/@self/payment_instruction/payment_token
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartSelfPaymentInstructionPaymentTokenDetail = (
		storeId: string,
		query: {
			/** payment_token */
			payment_token: string;
			/** payment_method */
			payment_method: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails ||
				this.traceDetails.includes('cartSelfPaymentInstructionPaymentTokenDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartSelfPaymentInstructionPaymentTokenDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/cart/@self/payment_instruction/payment_token`,
			method: 'GET',
			query: query,
			secure: true,
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets sensitive data mask information for plain string.
	 *
	 * @tags Payment Instruction
	 * @name PaymentInstructionGetSensitiveDataMaskByPlainString
	 * @summary Get sensitive data mask information
	 * @request GET:/store/{storeId}/cart/@self/payment_instruction/sensitive_data_mask_by_plain_string
	 * @secure
	 * @response `200` `ComIbmCommerceEdpBeansEDPSensitiveDataMaskHelperDataBeanIBMSensitiveDataMaskByPlainString` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	paymentInstructionGetSensitiveDataMaskByPlainString = (
		storeId: string,
		query?: {
			/** The plain string for the sensitive data. */
			plainString?: string;
			/** The plain string for the sensitive data. */
			profileName?: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails ||
				this.traceDetails.includes('paymentInstructionGetSensitiveDataMaskByPlainString'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'paymentInstructionGetSensitiveDataMaskByPlainString',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceEdpBeansEDPSensitiveDataMaskHelperDataBeanIBMSensitiveDataMaskByPlainString,
			void
		>({
			path: `/store/${storeId}/cart/@self/payment_instruction/sensitive_data_mask_by_plain_string`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Processes the punch-out payment requests.
	 *
	 * @tags Payment Instruction
	 * @name PaymentInstructionRepay
	 * @summary Process payment punch-out request
	 * @request POST:/store/{storeId}/cart/@self/payment_instruction/repay
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	paymentInstructionRepay = (
		storeId: string,
		query: {
			/** The order identifier. */
			orderId: string;
			/** The payment instruction identifier. */
			piId: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('paymentInstructionRepay'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'paymentInstructionRepay',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/cart/@self/payment_instruction/repay`,
			method: 'POST',
			query: query,
			secure: true,
			storeId,
			...params,
		});
	};
	/**
	 * @description Deletes payment instructions from the shopping cart.
	 *
	 * @tags Payment Instruction
	 * @name PaymentInstructionDeletePaymentInstruction
	 * @summary Delete payment instructions
	 * @request DELETE:/store/{storeId}/cart/@self/payment_instruction/{paymentInstruction_id}
	 * @secure
	 * @response `200` `CartDeletePaymentInstruction` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	paymentInstructionDeletePaymentInstruction = (
		storeId: string,
		paymentInstructionId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails ||
				this.traceDetails.includes('paymentInstructionDeletePaymentInstruction'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'paymentInstructionDeletePaymentInstruction',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartDeletePaymentInstruction, void>({
			path: `/store/${storeId}/cart/@self/payment_instruction/${paymentInstructionId}`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Processes punch-out call back requests.
	 *
	 * @tags Payment Instruction
	 * @name PaymentInstructionPunchoutPaymentCallBack
	 * @summary Process punch-out call back request
	 * @request POST:/store/{storeId}/cart/@self/payment_instruction/callback
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	paymentInstructionPunchoutPaymentCallBack = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails ||
				this.traceDetails.includes('paymentInstructionPunchoutPaymentCallBack'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'paymentInstructionPunchoutPaymentCallBack',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/cart/@self/payment_instruction/callback`,
			method: 'POST',
			query: query,
			secure: true,
			storeId,
			...params,
		});
	};
}
