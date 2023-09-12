import {
	ComIbmCommerceRestOrderHandlerOrderHandlerCSRCommentForm,
	ComIbmCommerceRestOrderHandlerOrderHandlerCSRCommentResponseForm,
	ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary,
	ComIbmCommerceToolsOptoolsOrderBeansOrderCommentRestDataBeanIBMSummary,
	Empty,
	OrderOrderDetail,
	OrderOrderDetails,
	OrderOrderHistoryResponse,
	OrderOrderSummary,
	ValidateMerchantRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Order<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags order
	 * @name MerchantValidateCreate
	 * @summary Performs the merchant validation
	 * @request POST:/store/{storeId}/merchant/validate
	 * @secure
	 * @response `200` `Empty` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	merchantValidateCreate = (
		storeId: string,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		data?: ValidateMerchantRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('merchantValidateCreate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'merchantValidateCreate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<Empty, void>({
			path: `/store/${storeId}/merchant/validate`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags order
	 * @name MerchantDetail
	 * @summary Get the merchant information
	 * @request GET:/store/{storeId}/merchant
	 * @secure
	 * @response `200` `Empty` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	merchantDetail = (
		storeId: string,
		query: {
			/** The payment system which is used for ApplePay */
			paymentSystem: string;
			/** The payment configuration group */
			paymentConfigGroup: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isnt specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isnt specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('merchantDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'merchantDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<Empty, void>({
			path: `/store/${storeId}/merchant`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets the order history for the authenticated user.
	 *
	 * @tags Order
	 * @name OrderFindOrderHistory
	 * @summary Get order history
	 * @request GET:/store/{storeId}/order/@history
	 * @secure
	 * @response `200` `OrderOrderSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	orderFindOrderHistory = (
		storeId: string,
		query?: {
			/** The user identifier. */
			userId?: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/**
			 * Page number. Valid values are positive integers starting at 1. Use pageNumber with pageSize.
			 * @format int32
			 */
			pageNumber?: number;
			/**
			 * Page size. Used to limit the amount of data returned by a query. Valid values are integers starting with 1. Use pageSize with pageNumber.
			 * @format int32
			 */
			pageSize?: number;
			/**
			 * The currency code to use for example, currency=USD. If no currency code is specified, the store default currency is used.
			 * @example JPY,CNY,USD
			 */
			currency?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('orderFindOrderHistory'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'orderFindOrderHistory',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<OrderOrderSummary, void>({
			path: `/store/${storeId}/order/@history`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Deletes the order history for the authenticated user.
	 *
	 * @tags Order
	 * @name OrderDeleteOrderHistory
	 * @summary Delete order history
	 * @request DELETE:/store/{storeId}/order/@history
	 * @secure
	 * @response `200` `OrderOrderHistoryResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	orderDeleteOrderHistory = (
		storeId: string,
		query: {
			/** The user identifier. */
			userId: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('orderDeleteOrderHistory'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'orderDeleteOrderHistory',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<OrderOrderHistoryResponse, void>({
			path: `/store/${storeId}/order/@history`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets order details for a specified external order ID.
	 *
	 * @tags Order
	 * @name OrderFindOmsOrderDetailsByExternalOrderId
	 * @summary Get details by external order ID
	 * @request GET:/store/{storeId}/order/oms_order/{extOrderId}
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	orderFindOmsOrderDetailsByExternalOrderId = (
		storeId: string,
		extOrderId: string,
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
				this.traceDetails.includes('orderFindOmsOrderDetailsByExternalOrderId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'orderFindOmsOrderDetailsByExternalOrderId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/order/oms_order/${extOrderId}`,
			method: 'GET',
			query: query,
			secure: true,
			...params,
		});
	};
	/**
	 * @description Gets a list of orders by a merchant assigned order reference number (ORMOrder).
	 *
	 * @tags Order
	 * @name OrderFindByOrmOrder
	 * @summary Get orders by order reference number
	 * @request GET:/store/{storeId}/order/byORMOrder/{ORMOrder}
	 * @secure
	 * @response `200` `OrderOrderSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	orderFindByOrmOrder = (
		storeId: string,
		ormOrder: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/**
			 * Page number. Valid values are positive integers starting at 1. Use pageNumber with pageSize.
			 * @format int32
			 */
			pageNumber?: number;
			/**
			 * Page size. Used to limit the amount of data returned by a query. Valid values are integers starting with 1. Use pageSize with pageNumber.
			 * @format int32
			 */
			pageSize?: number;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('orderFindByOrmOrder'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'orderFindByOrmOrder',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<OrderOrderSummary, void>({
			path: `/store/${storeId}/order/byORMOrder/${ormOrder}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Finds order comments for the specific order.
	 *
	 * @tags Order
	 * @name OrderGetOrderCommentsByOrderId
	 * @summary Get order comments
	 * @request GET:/store/{storeId}/order/{orderId}/comment
	 * @secure
	 * @response `200` `ComIbmCommerceToolsOptoolsOrderBeansOrderCommentRestDataBeanIBMSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	orderGetOrderCommentsByOrderId = (
		storeId: string,
		orderId: string,
		query?: {
			/** Returned order comments sorted in ascending order. */
			isAsc?: boolean;
			/** The order by field name. */
			orderByField?: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/**
			 * Page number. Valid values are positive integers starting at 1. Use pageNumber with pageSize.
			 * @format int32
			 */
			pageNumber?: number;
			/**
			 * Page size. Used to limit the amount of data returned by a query. Valid values are integers starting with 1. Use pageSize with pageNumber.
			 * @format int32
			 */
			pageSize?: number;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('orderGetOrderCommentsByOrderId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'orderGetOrderCommentsByOrderId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceToolsOptoolsOrderBeansOrderCommentRestDataBeanIBMSummary,
			void
		>({
			path: `/store/${storeId}/order/${orderId}/comment`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Adds CSR comments to the order.
	 *
	 * @tags Order
	 * @name OrderAddCsrOrderComments
	 * @summary Add comments (CSR)
	 * @request POST:/store/{storeId}/order/{orderId}/comment
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerOrderHandlerCSRCommentResponseForm` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	orderAddCsrOrderComments = (
		storeId: string,
		orderId: string,
		query?: {
			/** CSR add comment mode. */
			mode?: 'self' | 'onbehalf';
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerOrderHandlerCSRCommentForm,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('orderAddCsrOrderComments'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'orderAddCsrOrderComments',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerOrderHandlerCSRCommentResponseForm,
			void
		>({
			path: `/store/${storeId}/order/${orderId}/comment`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Processes an order for a specified external order ID.
	 *
	 * @tags Order
	 * @name OrderProcessOmsOrderByExternalOrderId
	 * @summary Process by external order ID
	 * @request POST:/store/{storeId}/order/process_oms_order/{extOrderId}
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	orderProcessOmsOrderByExternalOrderId = (
		storeId: string,
		extOrderId: string,
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
			(!this.traceDetails || this.traceDetails.includes('orderProcessOmsOrderByExternalOrderId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'orderProcessOmsOrderByExternalOrderId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/order/process_oms_order/${extOrderId}`,
			method: 'POST',
			query: query,
			secure: true,
			...params,
		});
	};
	/**
	 * @description Gets a list of orders by buyer ID.
	 *
	 * @tags Order
	 * @name OrderFindByBuyerId
	 * @summary Get orders by buyer ID
	 * @request GET:/store/{storeId}/order/byBuyerId/{buyerId}
	 * @secure
	 * @response `200` `OrderOrderDetails` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	orderFindByBuyerId = (
		storeId: string,
		buyerId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/**
			 * Page number. Valid values are positive integers starting at 1. Use pageNumber with pageSize.
			 * @format int32
			 */
			pageNumber?: number;
			/**
			 * Page size. Used to limit the amount of data returned by a query. Valid values are integers starting with 1. Use pageSize with pageNumber.
			 * @format int32
			 */
			pageSize?: number;
			/**
			 * The currency code to use for example, currency=USD. If no currency code is specified, the store default currency is used.
			 * @example USD,JPY
			 */
			currency?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('orderFindByBuyerId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'orderFindByBuyerId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<OrderOrderDetails, void>({
			path: `/store/${storeId}/order/byBuyerId/${buyerId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets the order details for a specific order ID.
	 *
	 * @tags Order
	 * @name OrderFindByOrderId
	 * @summary Get order details by order ID
	 * @request GET:/store/{storeId}/order/{orderId}
	 * @secure
	 * @response `200` `OrderOrderDetail` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	orderFindByOrderId = (
		orderId: string,
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/**
			 * Page number. Valid values are positive integers starting at 1. Use pageNumber with pageSize.
			 * @format int32
			 */
			pageNumber?: number;
			/**
			 * Page size. Used to limit the amount of data returned by a query. Valid values are integers starting with 1. Use pageSize with pageNumber.
			 * @format int32
			 */
			pageSize?: number;
			/**
			 * The currency code to use for example, currency=USD. If no currency code is specified, the store default currency is used.
			 * @example USD,JPY
			 */
			currency?: string;
			/** Sorts order items based on the specified field. For example, orderItemID or createDate. Please note <i>createDate</i> is supported starting from v9.1.11.0, If do not pass any value,the order items will be sorted by the shipping address id. */
			sortOrderItemBy?:
				| 'orderItemID'
				| 'createDate'
				| 'quantity'
				| 'inventoryStatus'
				| 'price'
				| 'unitPrice'
				| 'partNumber';
			/** The sort order of the requested field. ASC for ascending order and DESC for descending order. Default is ascending. */
			sortOrder?: 'ASC' | 'DESC';
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: 'IBM_Summary' | 'IBM_Details';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('orderFindByOrderId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'orderFindByOrderId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<OrderOrderDetail, void>({
			path: `/store/${storeId}/order/${orderId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Copies an order for a specified external order ID.
	 *
	 * @tags Order
	 * @name OrderCopyOmsOrderByExternalOrderId
	 * @summary Copy by external order ID
	 * @request POST:/store/{storeId}/order/copy_oms_order/{extOrderId}
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	orderCopyOmsOrderByExternalOrderId = (
		storeId: string,
		extOrderId: string,
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
			(!this.traceDetails || this.traceDetails.includes('orderCopyOmsOrderByExternalOrderId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'orderCopyOmsOrderByExternalOrderId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/order/copy_oms_order/${extOrderId}`,
			method: 'POST',
			query: query,
			secure: true,
			...params,
		});
	};
	/**
	 * @description Allows CSRs to find orders to work on behalf of a shopper.
	 *
	 * @tags Order
	 * @name OrderOrdersICanWorkonbehalf
	 * @summary Get order to work onbehalf of
	 * @request GET:/store/{storeId}/order
	 * @secure
	 * @response `200` `ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	orderOrdersICanWorkonbehalf = (
		storeId: string,
		query: {
			/** The query name. */
			q:
				| 'orderProfile'
				| 'findByParentOrderId'
				| 'findByStatusExt'
				| 'findChildOrderByOrderItemId'
				| 'findConfigurationByOrderItemId'
				| 'ordersICanWorkonbehalf'
				| 'findOrderPromotions';
			/** The order Id. */
			orderId: string;
			/** The order item identifier. */
			orderItemId: string;
			/** the user ID. */
			userId?: string;
			/** Profile name. Profiles determine the subset of data returned by a query. The default profile name = IBM_Summary. */
			profileName?: 'IBM_Summary';
			/** The order by table name. */
			orderByTableName?: string;
			/** The order by field name. */
			orderByFieldName?: string;
			/** The external order identifier. */
			extOrderId?: string;
			/** The total number of records in set. */
			recordSetTotal?: string;
			/** The order status to use for the retrieval of orders. */
			retrievalOrderStatus?: string;
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work. */
			pageNumber?: string;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work. */
			pageSize?: string;
			/** The starting index of the result. */
			startIndex?: string;
			/** Whether to retrieve pending guest orders or to exclude them. When set to true, only pending orders placed by guest users will be returned. Default value is false. This parameter will be ignored when the 'status' parameter is set. */
			retrievePendingGuestOrders?: 'true' | 'false';
			/** The order status. If 'status' is set, the 'retrievePendingGuestOrders' parameter will be ignored. */
			status?: string;
			/** The maximum number of results to return. */
			maxResults?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('orderOrdersICanWorkonbehalf'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'orderOrdersICanWorkonbehalf',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceToolsOptoolsOrderBeansCSROrderSearchDataBeanIBMSummary,
			void
		>({
			path: `/store/${storeId}/order`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets a list of orders by order status.
	 *
	 * @tags Order
	 * @name OrderFindByStatus
	 * @summary Get orders by status
	 * @request GET:/store/{storeId}/order/byStatus/{status}
	 * @secure
	 * @response `200` `OrderOrderSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	orderFindByStatus = (
		storeId: string,
		status: string,
		query?: {
			/** The order type. */
			orderType?: 'private' | 'shared' | 'all';
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/**
			 * Page number. Valid values are positive integers starting at 1. Use pageNumber with pageSize.
			 * @format int32
			 */
			pageNumber?: number;
			/**
			 * Page size. Used to limit the amount of data returned by a query. Valid values are integers starting with 1. Use pageSize with pageNumber.
			 * @format int32
			 */
			pageSize?: number;
			/**
			 * The currency code to use for example, currency=USD. If no currency code is specified, the store default currency is used.
			 * @example USD,JPY
			 */
			currency?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('orderFindByStatus'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'orderFindByStatus',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<OrderOrderSummary, void>({
			path: `/store/${storeId}/order/byStatus/${status}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
