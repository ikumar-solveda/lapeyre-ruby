import {
	ComIbmCommerceRestMarketingHandlerSegmentHandlerSegmentMemberCheck,
	SegmentSegments,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Segment<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets customer segment by segmentId.
	 *
	 * @tags Segment
	 * @name GetCustomerSegmentById
	 * @summary Get segment by the segment ID
	 * @request GET:/store/{storeId}/segment/{segmentId}
	 * @secure
	 * @response `200` `SegmentSegments` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	getCustomerSegmentById = (
		storeId: string,
		segmentId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('getCustomerSegmentById')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'getCustomerSegmentById',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<SegmentSegments, void>({
			path: `/store/${storeId}/segment/${segmentId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Checks if the customer identified by userId or personalizationId is part of given customer segment.
	 *
	 * @tags Segment
	 * @name CheckIsInSegmentByUserId
	 * @summary Check segment membership
	 * @request GET:/store/{storeId}/segment/{segmentId}/isMember
	 * @secure
	 * @response `200` `ComIbmCommerceRestMarketingHandlerSegmentHandlerSegmentMemberCheck` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	checkIsInSegmentByUserId = (
		storeId: string,
		segmentId: string,
		query?: {
			/**
			 * User unique identifier.
			 * @format int32
			 */
			userId?: number;
			/** The user's personalization id. Note : this parameter is ignored if the userId parameter is specified. */
			personalizationId?: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('checkIsInSegmentByUserId')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'checkIsInSegmentByUserId',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMarketingHandlerSegmentHandlerSegmentMemberCheck,
			void
		>({
			path: `/store/${storeId}/segment/${segmentId}/isMember`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Gets all customer segments by a specified storeId or get segment by userId or personalizationId or byName.
	 *
	 * @tags Segment
	 * @name GetCustomerSegments
	 * @summary Get segments by user or store ID
	 * @request GET:/store/{storeId}/segment
	 * @secure
	 * @response `200` `SegmentSegments` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	getCustomerSegments = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byUserId' | 'byPersonalizationId' | 'byName' | 'all';
			/**
			 * The user identifier. Required if the query is set to byUserId.
			 * @format int32
			 */
			qUserId?: number;
			/** The user's personalization identifier. Required if the query is set to byPersonalizationId. */
			qPersonalizationId?: string;
			/** The user's name. Required if the query is set to byName. */
			qName?: string;
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
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('getCustomerSegments')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'getCustomerSegments',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<SegmentSegments, void>({
			path: `/store/${storeId}/segment`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
