import {
	CartCartUpdateItemShippinginfo,
	CartShippingInfo,
	CartUsableShippingInfo,
	ComIbmCommerceOrderBeansUsableShipChargesAndAccountByShipModeDataBeanIBMUsableShipChargesByShipMode,
	ComIbmCommerceRestOrderHandlerCartHandlerShippingModes,
	ComIbmCommerceRestOrderHandlerShippingInfoHandlerUpdateShippingInfoBodyDescription,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class ShippingInfo<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets shipping information for the shopping cart.
	 *
	 * @tags Shipping Info
	 * @name ShippingInfoGetShippingInfo
	 * @summary Get shipping instructions
	 * @request GET:/store/{storeId}/cart/@self/shipping_info
	 * @secure
	 * @response `200` `CartShippingInfo` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	shippingInfoGetShippingInfo = (
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
			 * Language identifier. If not specified, the "locale" parameter is used. If "locale" is not specified, then the store default language is used.
			 * @example -1, -2 , -3, -4, -5
			 */
			langId?: string;
			/**
			 * The locale to use for example, locale=en_US. If the "langId" parameter is specified, the "locale" parameter is ignored. If no locale is specified, the store default locale is used.
			 * @example en_US, fr_FR, de_DE
			 */
			locale?: string;
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
			(!this.traceDetails || this.traceDetails.includes('shippingInfoGetShippingInfo'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'shippingInfoGetShippingInfo',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartShippingInfo, void>({
			path: `/store/${storeId}/cart/@self/shipping_info`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Updates shipping information for the shopping cart.
	 *
	 * @tags Shipping Info
	 * @name ShippingInfoUpdateOrderShippingInfo
	 * @summary Update shipping information
	 * @request PUT:/store/{storeId}/cart/@self/shipping_info
	 * @secure
	 * @response `200` `CartCartUpdateItemShippinginfo` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	shippingInfoUpdateOrderShippingInfo = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** User name to act on behalf of. */
			forUser?: string;
			/** User identifier to act on behalf of. */
			forUserId?: string;
		},
		data?: ComIbmCommerceRestOrderHandlerShippingInfoHandlerUpdateShippingInfoBodyDescription,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('shippingInfoUpdateOrderShippingInfo'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'shippingInfoUpdateOrderShippingInfo',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartCartUpdateItemShippinginfo, void>({
			path: `/store/${storeId}/cart/@self/shipping_info`,
			method: 'PUT',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets shipping modes for the shopping cart.
	 *
	 * @tags Shipping Info
	 * @name CartGetAllowableShippingModes
	 * @summary Get shipping modes
	 * @request GET:/store/{storeId}/cart/shipping_modes
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerCartHandlerShippingModes` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartGetAllowableShippingModes = (
		storeId: string,
		query?: {
			/**
			 * The locale to use for example, locale=en_US. If the "langId" parameter is specified, the "locale" parameter is ignored. If no locale is specified, the store default locale is used.
			 * @example en_US, fr_FR, de_DE
			 */
			locale?: string;
			/**
			 * Language identifier. If not specified, the "locale" parameter is used. If "locale" is not specified, then the store default language is used.
			 * @example -1, -2, -3, -4, -5, -6, -7, -8, -10, -20, -21, -9, -22, -23
			 */
			langId?: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartGetAllowableShippingModes'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartGetAllowableShippingModes',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestOrderHandlerCartHandlerShippingModes, void>({
			path: `/store/${storeId}/cart/shipping_modes`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets shipping information for the shopping cart.
	 *
	 * @tags Shipping Info
	 * @name CartGetUsableShippingInfo
	 * @summary Get shipping information
	 * @request GET:/store/{storeId}/cart/@self/usable_shipping_info
	 * @secure
	 * @response `200` `CartUsableShippingInfo` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartGetUsableShippingInfo = (
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
			/** The order ID. */
			orderId?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('cartGetUsableShippingInfo'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartGetUsableShippingInfo',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartUsableShippingInfo, void>({
			path: `/store/${storeId}/cart/@self/usable_shipping_info`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets usable shipping charge information for the specified order ID.
	 *
	 * @tags Shipping Info
	 * @name CartGetUsableShipChargesByShipMode
	 * @summary Get shipping charge
	 * @request GET:/store/{storeId}/cart/{orderId}/usable_ship_charges_by_ship_mode
	 * @secure
	 * @response `200` `ComIbmCommerceOrderBeansUsableShipChargesAndAccountByShipModeDataBeanIBMUsableShipChargesByShipMode` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartGetUsableShipChargesByShipMode = (
		storeId: string,
		orderId: string,
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
			(!this.traceDetails || this.traceDetails.includes('cartGetUsableShipChargesByShipMode'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartGetUsableShipChargesByShipMode',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceOrderBeansUsableShipChargesAndAccountByShipModeDataBeanIBMUsableShipChargesByShipMode,
			void
		>({
			path: `/store/${storeId}/cart/${orderId}/usable_ship_charges_by_ship_mode`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
