import {
	CartCalculate,
	CartCancelCSROrder,
	CartCart,
	CartCreateorder,
	CartRenewOrderItems,
	CartUsablePaymentInfo,
	ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummary,
	ComIbmCommercePaymentBeansBuyerPurchaseOrderDataBeanIBMBuyerPurchaseOrderSummary,
	ComIbmCommercePaymentBeansPaymentPolicyListDataBeanIBMPaymentPolicyListDetailed,
	ComIbmCommerceRestOrderHandlerCartHandlerAddConfigurationToCartRequest,
	ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescription,
	ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderRequest,
	ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderResponse,
	ComIbmCommerceRestOrderHandlerCartHandlerCancelOrder,
	ComIbmCommerceRestOrderHandlerCartHandlerCartResponse,
	ComIbmCommerceRestOrderHandlerCartHandlerCheckoutRequest,
	ComIbmCommerceRestOrderHandlerCartHandlerCopyOrderRequest,
	ComIbmCommerceRestOrderHandlerCartHandlerCreateOrderRequest,
	ComIbmCommerceRestOrderHandlerCartHandlerDeleteOrderItemRequest,
	ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainer,
	ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerDelete,
	ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerLock,
	ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerRequest,
	ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerResponse,
	ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerUnlockonbehalf,
	ComIbmCommerceRestOrderHandlerCartHandlerOrderItemMoveRequest,
	ComIbmCommerceRestOrderHandlerCartHandlerOrderScheduleRequest,
	ComIbmCommerceRestOrderHandlerCartHandlerOrderScheduleResponse,
	ComIbmCommerceRestOrderHandlerCartHandlerOrderWithOrderItemContainer,
	ComIbmCommerceRestOrderHandlerCartHandlerRewardChoiceUpdateRequest,
	ComIbmCommerceRestOrderHandlerCartHandlerSetPendingOrderRequest,
	ComIbmCommerceRestOrderHandlerCartHandlerSetPendingOrderResponse,
	ComIbmCommerceRestOrderHandlerCartHandlerUpdateConfigurationInCartRequest,
	ComIbmCommerceRestOrderHandlerCartHandlerUpdateOrderItemBodyDescription,
	ComIbmCommerceUtfBeansPAttributeDataBeanIBMPAttributeDetailed,
	UsableShippingMode,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Cart<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Cart
	 * @name GetUsableShippingMode
	 * @summary Gets usable shipping information for the shopping cart by address.
	 * @request GET:/store/{storeId}/cart/@self/usable_shipping_mode
	 * @secure
	 * @response `200` `UsableShippingMode` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `404` `void` The specified resource couldn't be found.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	getUsableShippingMode = (
		storeId: string,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: 'xml' | 'json';
			/**
			 * Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
			 * @format int32
			 */
			pageNumber?: number;
			/**
			 * Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
			 * @format int32
			 */
			pageSize?: number;
			/** The order ID. */
			orderId?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('getUsableShippingMode'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'getUsableShippingMode',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<UsableShippingMode, void>({
			path: `/store/${storeId}/cart/@self/usable_shipping_mode`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Checks out the shopping cart.
	 *
	 * @tags Cart
	 * @name CartCheckOut
	 * @summary Check out
	 * @request POST:/store/{storeId}/cart/@self/checkout
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainer` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartCheckOut = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerCheckoutRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (loggerCan('trace') && (!this.traceDetails || this.traceDetails.includes('cartCheckOut'))) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartCheckOut',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainer, void>({
			path: `/store/${storeId}/cart/@self/checkout`,
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
	 * @description Allows the CSR to cancel the specified order.
	 *
	 * @tags Cart
	 * @name CartCsrCancelOrder
	 * @summary Cancel order (CSR)
	 * @request DELETE:/store/{storeId}/cart/{orderId}/csrcancel_order
	 * @secure
	 * @response `200` `CartCancelCSROrder` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartCsrCancelOrder = (
		storeId: string,
		orderId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** This parameter is used to cancel an order that has deposited payment. */
			forcedCancel?: 'true' | 'false';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartCsrCancelOrder'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartCsrCancelOrder',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartCancelCSROrder, void>({
			path: `/store/${storeId}/cart/${orderId}/csrcancel_order`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Moves order items from one order to another.
	 *
	 * @tags Cart
	 * @name CartMoveOrderItem
	 * @summary Move order items
	 * @request PUT:/store/{storeId}/cart/move_order_item
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerOrderItemMoveRequest` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartMoveOrderItem = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerOrderItemMoveRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartMoveOrderItem'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartMoveOrderItem',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerOrderItemMoveRequest, void>({
			path: `/store/${storeId}/cart/move_order_item`,
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
	 * @description Gets payment attribute order information for the terms and conditions ID.
	 *
	 * @tags Cart
	 * @name CartGetPAttributeDataBean
	 * @summary Get terms and conditions
	 * @request GET:/store/{storeId}/cart/@self/pattribute/{initKey_referenceNumber}
	 * @secure
	 * @response `200` `ComIbmCommerceUtfBeansPAttributeDataBeanIBMPAttributeDetailed` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartGetPAttributeDataBean = (
		storeId: string,
		initKeyReferenceNumber: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartGetPAttributeDataBean'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartGetPAttributeDataBean',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceUtfBeansPAttributeDataBeanIBMPAttributeDetailed, void>({
			path: `/store/${storeId}/cart/@self/pattribute/${initKeyReferenceNumber}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Updates the reward option.
	 *
	 * @tags Cart
	 * @name CartUpdateRewardOption
	 * @summary Update reward option
	 * @request PUT:/store/{storeId}/cart/@self/update_reward_option
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerRewardChoiceUpdateRequest` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartUpdateRewardOption = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerRewardChoiceUpdateRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartUpdateRewardOption'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartUpdateRewardOption',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerCartHandlerRewardChoiceUpdateRequest,
			void
		>({
			path: `/store/${storeId}/cart/@self/update_reward_option`,
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
	 * @description Calculates the price of the order.
	 *
	 * @tags Cart
	 * @name CartCalculateOrder1
	 * @summary Calculate order price
	 * @request POST:/store/{storeId}/cart/calculate
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartCalculateOrder1 = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartCalculateOrder1'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartCalculateOrder1',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderResponse, void>(
			{
				path: `/store/${storeId}/cart/calculate`,
				method: 'POST',
				query: query,
				body: data,
				secure: true,
				type: params.type ?? ContentType.Json,
				format: params.format ?? 'json',
				storeId,
				...params,
			}
		);
	};
	/**
	 * @description Updates one or more order items in the shopping cart.
	 *
	 * @tags Cart
	 * @name CartUpdateOrderItem
	 * @summary Update order items
	 * @request PUT:/store/{storeId}/cart/@self/update_order_item
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerOrderWithOrderItemContainer` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartUpdateOrderItem = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerUpdateOrderItemBodyDescription,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartUpdateOrderItem'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartUpdateOrderItem',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerCartHandlerOrderWithOrderItemContainer,
			void
		>({
			path: `/store/${storeId}/cart/@self/update_order_item`,
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
	 * @description Gets buyer purchase order information for the specified buyer purchase order ID.
	 *
	 * @tags Cart
	 * @name CartGetBuyerPurchaseOrderDataBean
	 * @summary Get purchase order information
	 * @request GET:/store/{storeId}/cart/@self/buyer_purchase_order/{buyerPurchaseOrderId}
	 * @secure
	 * @response `200` `ComIbmCommercePaymentBeansBuyerPurchaseOrderDataBeanIBMBuyerPurchaseOrderSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartGetBuyerPurchaseOrderDataBean = (
		storeId: string,
		buyerPurchaseOrderId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartGetBuyerPurchaseOrderDataBean'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartGetBuyerPurchaseOrderDataBean',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommercePaymentBeansBuyerPurchaseOrderDataBeanIBMBuyerPurchaseOrderSummary,
			void
		>({
			path: `/store/${storeId}/cart/@self/buyer_purchase_order/${buyerPurchaseOrderId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Adds dynamic kit configurations to the shopping cart.
	 *
	 * @tags Cart
	 * @name CartAddConfigurationToCart
	 * @summary Add dynamic kit
	 * @request POST:/store/{storeId}/cart/@self/add_configuration_to_cart
	 * @secure
	 * @response `201` `ComIbmCommerceRestOrderHandlerCartHandlerCartResponse` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartAddConfigurationToCart = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerAddConfigurationToCartRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartAddConfigurationToCart'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartAddConfigurationToCart',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerCartResponse, void>({
			path: `/store/${storeId}/cart/@self/add_configuration_to_cart`,
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
	 * @description Copies the order into a new order.
	 *
	 * @tags Cart
	 * @name CartCopyOrder
	 * @summary Copy order
	 * @request POST:/store/{storeId}/cart/copy_order
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerCopyOrderRequest` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartCopyOrder = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerCopyOrderRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (loggerCan('trace') && (!this.traceDetails || this.traceDetails.includes('cartCopyOrder'))) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartCopyOrder',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerCopyOrderRequest, void>({
			path: `/store/${storeId}/cart/copy_order`,
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
	 * @description Updates a dynamic kit configuration in the shopping cart.
	 *
	 * @tags Cart
	 * @name CartUpdateConfigurationInCart
	 * @summary Update dynamic kit configuration
	 * @request PUT:/store/{storeId}/cart/@self/update_configuration_in_cart
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerCartResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartUpdateConfigurationInCart = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerUpdateConfigurationInCartRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartUpdateConfigurationInCart'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartUpdateConfigurationInCart',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerCartResponse, void>({
			path: `/store/${storeId}/cart/@self/update_configuration_in_cart`,
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
	 * @description Sets the specified order as the pending order.
	 *
	 * @tags Cart
	 * @name CartSetPendingOrder
	 * @summary Set pending order
	 * @request POST:/store/{storeId}/cart/{orderId}/set_pending_order
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerSetPendingOrderResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartSetPendingOrder = (
		storeId: string,
		orderId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerSetPendingOrderRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartSetPendingOrder'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartSetPendingOrder',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerCartHandlerSetPendingOrderResponse,
			void
		>({
			path: `/store/${storeId}/cart/${orderId}/set_pending_order`,
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
	 * @description Allows the buyer administrator or CSR to lock the shopping cart. The administrator must have already established a session to act on behalf of a user.
	 *
	 * @tags Cart
	 * @name CartLockCartOnBehalf
	 * @summary Lock cart (buyer administrator)
	 * @request POST:/store/{storeId}/cart/{cartId}/lockOnBehalf
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerLock` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartLockCartOnBehalf = (
		storeId: string,
		cartId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** User name to act on behalf of. */
			forUser?: string;
			/** User identifier to act on behalf of. */
			forUserId?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartLockCartOnBehalf'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartLockCartOnBehalf',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerLock, void>({
			path: `/store/${storeId}/cart/${cartId}/lockOnBehalf`,
			method: 'POST',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Creates a scheduled order. The order is related to a scheduled job.
	 *
	 * @tags Cart
	 * @name CartScheduleOrder
	 * @summary Create scheduled order
	 * @request POST:/store/{storeId}/cart/{orderId}/schedule_order
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerOrderScheduleResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartScheduleOrder = (
		storeId: string,
		orderId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerOrderScheduleRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartScheduleOrder'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartScheduleOrder',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerOrderScheduleResponse, void>({
			path: `/store/${storeId}/cart/${orderId}/schedule_order`,
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
	 * @description Adds one or more order items to the shopping cart.
	 *
	 * @tags Cart
	 * @name CartAddOrderItem
	 * @summary Add items
	 * @request POST:/store/{storeId}/cart
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerOrderWithOrderItemContainer` No response was specified.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartAddOrderItem = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerAddOrderItemBodyDescription,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartAddOrderItem'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartAddOrderItem',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerCartHandlerOrderWithOrderItemContainer,
			void
		>({
			path: `/store/${storeId}/cart`,
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
	 * @description Renews inventory status, price and address ID for order items. Remove order items that are out of stock.
	 *
	 * @tags Cart
	 * @name CartOrderItemDisplay
	 * @summary Renew inventory status
	 * @request POST:/store/{storeId}/cart/@self/renew_order_items
	 * @secure
	 * @response `200` `CartRenewOrderItems` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartOrderItemDisplay = (
		storeId: string,
		query?: {
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartOrderItemDisplay'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartOrderItemDisplay',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartRenewOrderItems, void>({
			path: `/store/${storeId}/cart/@self/renew_order_items`,
			method: 'POST',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Applies the quick checkout profile to the shopping cart.
	 *
	 * @tags Cart
	 * @name CartApplyCheckoutProfile
	 * @summary Apply quick checkout profile
	 * @request PUT:/store/{storeId}/cart/@self/applyCheckoutProfile
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartApplyCheckoutProfile = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartApplyCheckoutProfile'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartApplyCheckoutProfile',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerResponse,
			void
		>({
			path: `/store/${storeId}/cart/@self/applyCheckoutProfile`,
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
	 * @description Calculates the price of the order.
	 *
	 * @tags Cart
	 * @name CartCalculateOrder2
	 * @summary Calculate order price
	 * @request POST:/store/{storeId}/cart/{orderId}/calculate
	 * @secure
	 * @response `200` `CartCalculate` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartCalculateOrder2 = (
		storeId: string,
		orderId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerCalculateOrderRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartCalculateOrder2'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartCalculateOrder2',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartCalculate, void>({
			path: `/store/${storeId}/cart/${orderId}/calculate`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets billing address information for the specified order ID.
	 *
	 * @tags Cart
	 * @name CartGetUsableBillingAddressListTcDataBean
	 * @summary Get billing address
	 * @request GET:/store/{storeId}/cart/@self/usable_billing_address/{orderId}
	 * @secure
	 * @response `200` `ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartGetUsableBillingAddressListTcDataBean = (
		storeId: string,
		orderId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: string;
			/** The payment Term & Condition identifier for this payment instruction. */
			paymentTCId?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails ||
				this.traceDetails.includes('cartGetUsableBillingAddressListTcDataBean'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartGetUsableBillingAddressListTcDataBean',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceOrderBeansUsableBillingAddressListDataBeanIBMUsableBillingAddressListSummary,
			void
		>({
			path: `/store/${storeId}/cart/@self/usable_billing_address/${orderId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Cancels the specified order.
	 *
	 * @tags Cart
	 * @name CartCancelOrder
	 * @summary Cancel order
	 * @request DELETE:/store/{storeId}/cart/{orderId}/cancel_order
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerCancelOrder` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartCancelOrder = (
		storeId: string,
		orderId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** This parameter is used to cancel an order that has deposited payment. */
			forcedCancel?: 'true' | 'false';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartCancelOrder'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartCancelOrder',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerCancelOrder, void>({
			path: `/store/${storeId}/cart/${orderId}/cancel_order`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets payment information for the shopping cart.
	 *
	 * @tags Cart
	 * @name CartGetUsablePaymentInfo
	 * @summary Get payment information
	 * @request GET:/store/{storeId}/cart/@self/usable_payment_info
	 * @secure
	 * @response `200` `CartUsablePaymentInfo` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartGetUsablePaymentInfo = (
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
			/** Boolean flag to indicate true if all type of payment methods needs to be get in response, By default its false. */
			allPaymentMethods?: boolean;
			/** The order ID. */
			orderId?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartGetUsablePaymentInfo'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartGetUsablePaymentInfo',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartUsablePaymentInfo, void>({
			path: `/store/${storeId}/cart/@self/usable_payment_info`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Unlocks the shopping cart by a CSR.
	 *
	 * @tags Cart
	 * @name CartUnlockCart
	 * @summary Unlock cart (CSR)
	 * @request POST:/store/{storeId}/cart/{cartId}/unlock
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainer` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartUnlockCart = (
		storeId: string,
		cartId: string,
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
			(!this.traceDetails || this.traceDetails.includes('cartUnlockCart'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartUnlockCart',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainer, void>({
			path: `/store/${storeId}/cart/${cartId}/unlock`,
			method: 'POST',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Allows the CSR to cancel the specific order on behalf of a shopper.
	 *
	 * @tags Cart
	 * @name CartCsrCancelOrderOnBehalf
	 * @summary Cancel order (CSR on behalf of)
	 * @request DELETE:/store/{storeId}/cart/{orderId}/csrcancel_order_onbehalf
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartCsrCancelOrderOnBehalf = (
		storeId: string,
		orderId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** This parameter is used to cancel an order that has deposited payment. */
			forcedCancel?: 'true' | 'false';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartCsrCancelOrderOnBehalf'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartCsrCancelOrderOnBehalf',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/cart/${orderId}/csrcancel_order_onbehalf`,
			method: 'DELETE',
			query: query,
			secure: true,
			storeId,
			...params,
		});
	};
	/**
	 * @description Prepares the shopping cart for checkout. This method must be called before the checkout service.
	 *
	 * @tags Cart
	 * @name CartPreCheckout
	 * @summary Prepare for checkout
	 * @request PUT:/store/{storeId}/cart/@self/precheckout
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainer` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartPreCheckout = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartPreCheckout'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartPreCheckout',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainer, void>({
			path: `/store/${storeId}/cart/@self/precheckout`,
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
	 * @description Gets order details for the shopping cart.
	 *
	 * @tags Cart
	 * @name CartGetCart
	 * @summary Get order details
	 * @request GET:/store/{storeId}/cart/@self
	 * @secure
	 * @response `200` `CartCart` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartGetCart = (
		storeId: string,
		query?: {
			/**
			 * Language identifier. If not specified, the locale parameter will be used. If locale isn't specified, then the store default language shall be used.
			 * @example -1, -2, -3, -4, -5,-6, -7, -8, -9, -10
			 */
			langId?: string;
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
			/** The sort order of the results for example, sort by orderItemID or createDate. */
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

		if (loggerCan('trace') && (!this.traceDetails || this.traceDetails.includes('cartGetCart'))) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartGetCart',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartCart, void>({
			path: `/store/${storeId}/cart/@self`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Deletes all order items from the shopping cart.
	 *
	 * @tags Cart
	 * @name CartCancelOrderInCart
	 * @summary Delete items
	 * @request DELETE:/store/{storeId}/cart/@self
	 * @secure
	 * @response `204` `void` The requested completed successfully. No content is returned in the response.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartCancelOrderInCart = (
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
			(!this.traceDetails || this.traceDetails.includes('cartCancelOrderInCart'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartCancelOrderInCart',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/cart/@self`,
			method: 'DELETE',
			query: query,
			secure: true,
			storeId,
			...params,
		});
	};
	/**
	 * @description Allows the buyer administrator or CSR to unlock the shopping cart. The administrator must have already established a session to act on behalf of a user.
	 *
	 * @tags Cart
	 * @name CartUnlockCartOnBehalf
	 * @summary Unlock cart (buyer administrator)
	 * @request POST:/store/{storeId}/cart/{cartId}/unlockOnBehalf
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerUnlockonbehalf` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartUnlockCartOnBehalf = (
		storeId: string,
		cartId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** User name to act on behalf of. */
			forUser?: string;
			/** User identifier to act on behalf of. */
			forUserId?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartUnlockCartOnBehalf'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartUnlockCartOnBehalf',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerUnlockonbehalf,
			void
		>({
			path: `/store/${storeId}/cart/${cartId}/unlockOnBehalf`,
			method: 'POST',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Lists payment policies for the store.
	 *
	 * @tags Cart
	 * @name CartGetPaymentPolicyListDataBean
	 * @summary Get payment policy list
	 * @request GET:/store/{storeId}/cart/@self/payment_policy_list
	 * @secure
	 * @response `200` `ComIbmCommercePaymentBeansPaymentPolicyListDataBeanIBMPaymentPolicyListDetailed` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartGetPaymentPolicyListDataBean = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartGetPaymentPolicyListDataBean'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartGetPaymentPolicyListDataBean',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommercePaymentBeansPaymentPolicyListDataBeanIBMPaymentPolicyListDetailed,
			void
		>({
			path: `/store/${storeId}/cart/@self/payment_policy_list`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Creates an order.
	 *
	 * @tags Cart
	 * @name CartCreateOrder
	 * @summary Create order
	 * @request POST:/store/{storeId}/cart/create_order
	 * @secure
	 * @response `200` `CartCreateorder` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartCreateOrder = (
		storeId: string,
		query: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The description for the order. */
			description: string;
			/** The order type flag for identifying order is shared or private. */
			isSharedOrder?: boolean;
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerCreateOrderRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartCreateOrder'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartCreateOrder',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartCreateorder, void>({
			path: `/store/${storeId}/cart/create_order`,
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
	 * @description Deletes the specified order item from the order.
	 *
	 * @tags Cart
	 * @name CartDeleteOrderItem
	 * @summary Delete order item
	 * @request PUT:/store/{storeId}/cart/@self/delete_order_item
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerDelete` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartDeleteOrderItem = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestOrderHandlerCartHandlerDeleteOrderItemRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartDeleteOrderItem'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'cartDeleteOrderItem',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerDelete, void>(
			{
				path: `/store/${storeId}/cart/@self/delete_order_item`,
				method: 'PUT',
				query: query,
				body: data,
				secure: true,
				type: params.type ?? ContentType.Json,
				format: params.format ?? 'json',
				storeId,
				...params,
			}
		);
	};
	/**
	 * @description Allows the CSR to lock the shopping cart.
	 *
	 * @tags Cart
	 * @name CartLockCart
	 * @summary Lock cart (CSR)
	 * @request POST:/store/{storeId}/cart/{cartId}/lock
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerLock` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartLockCart = (
		storeId: string,
		cartId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (loggerCan('trace') && (!this.traceDetails || this.traceDetails.includes('cartLockCart'))) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartLockCart',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerOrderIdContainerLock, void>({
			path: `/store/${storeId}/cart/${cartId}/lock`,
			method: 'POST',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
