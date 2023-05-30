import {
	ApiHandlerResourceList,
	ApiHandlerSwaggerResourceList,
	ComIbmCommerceRestApiHandlerApiHandlerResourceLinkList,
	Empty,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Api<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags api
	 * @name AggregatedList
	 * @summary Get the aggregated list of available resources on multiple server.
	 * @request GET:/api/aggregated
	 * @deprecated
	 * @secure
	 * @response `200` `ComIbmCommerceRestApiHandlerApiHandlerResourceLinkList` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	aggregatedList = (
		query: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('aggregatedList')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'aggregatedList',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestApiHandlerApiHandlerResourceLinkList, void>({
			path: `/api/aggregated`,
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
	 * @tags api
	 * @name BundleDetail
	 * @summary Generate the default API resource bundle used for translation.
	 * @request GET:/api/bundle/{resourceName}
	 * @deprecated
	 * @secure
	 * @response `200` `Empty` The request is completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	bundleDetail = (resourceName: string, params: RequestParams = {}) => {
		if (!this.traceDetails || this.traceDetails.includes('bundleDetail')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'bundleDetail',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<Empty, void>({
			path: `/api/bundle/${resourceName}`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags api
	 * @name GetApi
	 * @summary Get the list of available resources on the server.
	 * @request GET:/api
	 * @secure
	 * @response `200` `(ApiHandlerResourceList | ApiHandlerSwaggerResourceList)` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	getApi = (
		query: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('getApi')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'getApi',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ApiHandlerResourceList | ApiHandlerSwaggerResourceList, void>({
			path: `/api`,
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
	 * @tags api
	 * @name ResourceDetail
	 * @summary Describe the APIs available on a resource by name.
	 * @request GET:/api/resource/{resourceName}
	 * @secure
	 * @response `200` `Empty` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	resourceDetail = (
		resourceName: string,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('resourceDetail')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'resourceDetail',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<Empty, void>({
			path: `/api/resource/${resourceName}`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
