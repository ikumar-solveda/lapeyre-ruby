import { CategoryviewCategoryDetails, CategoryviewCategorySummary } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Categoryview<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets catalogs by search term.
	 *
	 * @tags Categoryview
	 * @name CategoryviewByIdDetail
	 * @summary Gets category details based on its unique ID.
	 * @request GET:/store/{storeId}/categoryview/byId/{categoryId}
	 * @deprecated
	 * @secure
	 * @response `200` `CategoryviewCategoryDetails` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	categoryviewByIdDetail = (
		storeId: string,
		categoryId: string,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isnt specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isnt specified as well, the default response format shall be in json. */
			responseFormat?: string;
			/** The catalog identifier. If none is specified, the store default catalog shall be used. */
			catalogId?: string;
			/** The currency code to use. Example usage  currency=USD. If no currency code is specified, the store default currency shall be used. */
			currency?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('categoryviewByIdDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'categoryviewByIdDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CategoryviewCategoryDetails, void>({
			path: `/store/${storeId}/categoryview/byId/${categoryId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets catalogs by search term.
	 *
	 * @tags Categoryview
	 * @name CategoryviewTopDetail
	 * @summary Gets all top level categories.
	 * @request GET:/store/{storeId}/categoryview/@top
	 * @deprecated
	 * @secure
	 * @response `200` `CategoryviewCategoryDetails` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	categoryviewTopDetail = (
		storeId: string,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isnt specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isnt specified as well, the default response format shall be in json. */
			responseFormat?: string;
			/** The catalog identifier. If none is specified, the store default catalog shall be used. */
			catalogId?: string;
			/** The currency code to use. Example usage  currency=USD. If no currency code is specified, the store default currency shall be used. */
			currency?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('categoryviewTopDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'categoryviewTopDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CategoryviewCategoryDetails, void>({
			path: `/store/${storeId}/categoryview/@top`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets catalogs by search term.
	 *
	 * @tags Categoryview
	 * @name CategoryviewByParentCategoryDetail
	 * @summary Gets category details based on its unique ID.
	 * @request GET:/store/{storeId}/categoryview/byParentCategory/{parentCategoryId}
	 * @deprecated
	 * @secure
	 * @response `200` `CategoryviewCategorySummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	categoryviewByParentCategoryDetail = (
		storeId: string,
		parentCategoryId: string,
		query?: {
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The pageSize must be specified for paging to work. */
			pageNumber?: number;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The pageNumber must be specified for paging to work. */
			pageSize?: number;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isnt specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isnt specified as well, the default response format shall be in json. */
			responseFormat?: string;
			/** The catalog identifier. If none is specified, the store default catalog shall be used. */
			catalogId?: string;
			/** The currency code to use. Example usage  currency=USD. If no currency code is specified, the store default currency shall be used. */
			currency?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('categoryviewByParentCategoryDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'categoryviewByParentCategoryDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CategoryviewCategorySummary, void>({
			path: `/store/${storeId}/categoryview/byParentCategory/${parentCategoryId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
