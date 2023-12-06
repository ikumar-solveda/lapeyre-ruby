import {
	ComIbmCommerceRestMemberHandlerPersonCheckoutProfileHandlerCheckoutProfileIdContainer,
	ComIbmCommerceRestMemberHandlerPersonCheckoutProfileHandlerUserIdContainer,
	PersonCheckoutProfile,
	PersonCheckoutProfileUpdate,
	PersonCheckoutProfileUpdateById,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class CheckoutProfile<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets the Check Out Profiles for the logged in user using the Member service. The shopper must log in before invoking this method.
	 *
	 * @tags Checkout Profile
	 * @name CheckoutProfileGetCheckoutProfile
	 * @summary Get check out profiles
	 * @request GET:/store/{storeId}/person/@self/checkoutProfile
	 * @secure
	 * @response `200` `PersonCheckoutProfile` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	checkoutProfileGetCheckoutProfile = (
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
			(!this.traceDetails || this.traceDetails.includes('checkoutProfileGetCheckoutProfile'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'checkoutProfileGetCheckoutProfile',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PersonCheckoutProfile, void>({
			path: `/store/${storeId}/person/@self/checkoutProfile`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description This is a deprecated service and only useful for a single checkout profile. It updates and creates the CheckOutProfile (default) for the logged in user using the Member service. The shopper must log in before invoking this method.
	 *
	 * @tags Checkout Profile
	 * @name CheckoutProfileUpdateCheckoutProfile
	 * @summary Update check out profile
	 * @request PUT:/store/{storeId}/person/@self/checkoutProfile
	 * @deprecated
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerPersonCheckoutProfileHandlerUserIdContainer` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	checkoutProfileUpdateCheckoutProfile = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: PersonCheckoutProfileUpdate,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('checkoutProfileUpdateCheckoutProfile'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'checkoutProfileUpdateCheckoutProfile',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerPersonCheckoutProfileHandlerUserIdContainer,
			void
		>({
			path: `/store/${storeId}/person/@self/checkoutProfile`,
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
	 * @description Creates Check Out Profile for the logged in user using the Member service. The shopper must log in before invoking this method.
	 *
	 * @tags Checkout Profile
	 * @name CheckoutProfileCreateCheckoutProfile
	 * @summary Create a check out profile
	 * @request POST:/store/{storeId}/person/@self/checkoutProfile
	 * @secure
	 * @response `201` `ComIbmCommerceRestMemberHandlerPersonCheckoutProfileHandlerCheckoutProfileIdContainer` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	checkoutProfileCreateCheckoutProfile = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: PersonCheckoutProfileUpdateById,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('checkoutProfileCreateCheckoutProfile'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'checkoutProfileCreateCheckoutProfile',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerPersonCheckoutProfileHandlerCheckoutProfileIdContainer,
			void
		>({
			path: `/store/${storeId}/person/@self/checkoutProfile`,
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
	 * @description Updates the CheckOutProfile for the logged in user using the Member service. The shopper must log in before invoking this method.
	 *
	 * @tags Checkout Profile
	 * @name CheckoutProfileUpdateCheckoutProfileById
	 * @summary Update a check out profile
	 * @request PUT:/store/{storeId}/person/checkoutProfile/{checkoutProfileId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerPersonCheckoutProfileHandlerCheckoutProfileIdContainer` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	checkoutProfileUpdateCheckoutProfileById = (
		storeId: string,
		checkoutProfileId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: PersonCheckoutProfileUpdateById,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('checkoutProfileUpdateCheckoutProfileById'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'checkoutProfileUpdateCheckoutProfileById',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerPersonCheckoutProfileHandlerCheckoutProfileIdContainer,
			void
		>({
			path: `/store/${storeId}/person/checkoutProfile/${checkoutProfileId}`,
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
	 * @description Gets a Check Out Profile for the logged in user using the Member service. The shopper must log in before invoking this method.
	 *
	 * @tags Checkout Profile
	 * @name CheckoutProfileGetByIdCheckoutProfile
	 * @summary Get a check out profile
	 * @request GET:/store/{storeId}/person/checkoutProfile/{checkoutProfileId}
	 * @secure
	 * @response `200` `PersonCheckoutProfile` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	checkoutProfileGetByIdCheckoutProfile = (
		storeId: string,
		checkoutProfileId: string,
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
			(!this.traceDetails || this.traceDetails.includes('checkoutProfileGetByIdCheckoutProfile'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'checkoutProfileGetByIdCheckoutProfile',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PersonCheckoutProfile, void>({
			path: `/store/${storeId}/person/checkoutProfile/${checkoutProfileId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Deletes a Check Out Profile for the logged in user using the Member service. The shopper must log in before invoking this method.
	 *
	 * @tags Checkout Profile
	 * @name CheckoutProfileDeleteCheckoutProfile
	 * @summary Delete a check out profile
	 * @request DELETE:/store/{storeId}/person/checkoutProfile/{checkoutProfileId}
	 * @secure
	 * @response `204` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	checkoutProfileDeleteCheckoutProfile = (
		storeId: string,
		checkoutProfileId: string,
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
			(!this.traceDetails || this.traceDetails.includes('checkoutProfileDeleteCheckoutProfile'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'checkoutProfileDeleteCheckoutProfile',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/person/checkoutProfile/${checkoutProfileId}`,
			method: 'DELETE',
			query: query,
			secure: true,
			storeId,
			...params,
		});
	};
}
