import {
	ComIbmCommerceMarketingCommandsIssueCouponControllerCmd,
	CouponCoupon,
	CouponsCoupons,
	Empty,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Coupon<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Deletes coupons from coupon wallet by coupon ID.
	 *
	 * @tags Coupon
	 * @name CouponDeleteCouponById
	 * @summary Delete coupons by ID
	 * @request DELETE:/store/{storeId}/coupon/{couponId}
	 * @secure
	 * @response `200` `CouponsCoupons` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	couponDeleteCouponById = (
		storeId: string,
		couponId: string,
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
			(!this.traceDetails || this.traceDetails.includes('couponDeleteCouponById'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'couponDeleteCouponById',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CouponsCoupons, void>({
			path: `/store/${storeId}/coupon/${couponId}`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets available coupons for the current shopper.
	 *
	 * @tags Coupon
	 * @name CouponGetCoupon
	 * @summary Get coupons for shopper
	 * @request GET:/store/{storeId}/coupon/@self
	 * @secure
	 * @response `200` `CouponCoupon` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	couponGetCoupon = (
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
			 * @example USD
			 */
			currency?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('couponGetCoupon'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'couponGetCoupon',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CouponCoupon, void>({
			path: `/store/${storeId}/coupon/@self`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Allows the shopper to get their own coupons.
	 *
	 * @tags Coupon
	 * @name CouponIssueCoupon
	 * @summary Get coupons
	 * @request POST:/store/{storeId}/coupon/@self
	 * @secure
	 * @response `200` `ComIbmCommerceMarketingCommandsIssueCouponControllerCmd` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	couponIssueCoupon = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: Empty,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('couponIssueCoupon'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'couponIssueCoupon',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceMarketingCommandsIssueCouponControllerCmd, void>({
			path: `/store/${storeId}/coupon/@self`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			...params,
		});
	};
}
