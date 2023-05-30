import {
	CartAssignedCoupon,
	ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponBody,
	ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponResponse,
	ComIbmCommerceRestOrderHandlerAssignedCouponHandlerRemoveCouponResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class AssignedCoupon<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Assigned Coupon
	 * @name CartSelfAssignedCouponDetail
	 * @summary Gets assigned coupons for the shopping cart.
	 * @request GET:/store/{storeId}/cart/@self/assigned_coupon
	 * @secure
	 * @response `200` `CartAssignedCoupon` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartSelfAssignedCouponDetail = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('cartSelfAssignedCouponDetail')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartSelfAssignedCouponDetail',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CartAssignedCoupon, void>({
			path: `/store/${storeId}/cart/@self/assigned_coupon`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Assigned Coupon
	 * @name ApplyCoupon
	 * @summary Applies coupons to the shopping cart.
	 * @request POST:/store/{storeId}/cart/@self/assigned_coupon
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponResponse` No response was specified
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	applyCoupon = (
		storeId: string,
		data: ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponBody,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('applyCoupon')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'applyCoupon',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponResponse,
			void
		>({
			path: `/store/${storeId}/cart/@self/assigned_coupon`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Assigned Coupon
	 * @name CartSelfAssignedCouponDelete
	 * @summary Removes coupons from the shopping cart.
	 * @request DELETE:/store/{storeId}/cart/@self/assigned_coupon/{couponId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerAssignedCouponHandlerRemoveCouponResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	cartSelfAssignedCouponDelete = (
		storeId: string,
		couponId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('cartSelfAssignedCouponDelete')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'cartSelfAssignedCouponDelete',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerAssignedCouponHandlerRemoveCouponResponse,
			void
		>({
			path: `/store/${storeId}/cart/@self/assigned_coupon/${couponId}`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
