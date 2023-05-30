import { PageIBMStoreDetails, PageIBMStoreDetailsSEO } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Page<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Finds pages by category IDs. Invalid category IDs are ignored.
	 *
	 * @tags Page
	 * @name PageByCategoryIds
	 * @summary Get by category ID
	 * @request GET:/store/{storeId}/page
	 * @secure
	 * @response `200` `PageIBMStoreDetailsSEO` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	pageByCategoryIds = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byCategoryIds' | 'byUrlConfigurable' | 'byPageIds' | 'byNames' | 'byCatalogEntryIds';
			/** The category ID. */
			categoryId: string[];
			/** Whether the URL of the page is configurable. */
			urlConfigurable: boolean;
			/** The page ID. */
			pageId: string;
			/** The page name. */
			name: string;
			/** The catalog entry ID. */
			catalogEntryId: string;
			/** Profile name. Profiles determine the subset of data to be returned by a query. */
			profileName?: 'IBM_Store_Summary' | 'IBM_Store_Details';
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work. */
			pageNumber?: number;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work. */
			pageSize?: number;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('pageByCategoryIds')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'pageByCategoryIds',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PageIBMStoreDetailsSEO, void>({
			path: `/store/${storeId}/page`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Finds a page by its ID.
	 *
	 * @tags Page
	 * @name PageFindByPageId
	 * @summary Get by page ID
	 * @request GET:/store/{storeId}/page/{pageId}
	 * @secure
	 * @response `200` `PageIBMStoreDetails` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	pageFindByPageId = (
		storeId: string,
		pageId: string,
		query: {
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName: 'IBM_Store_Summary' | 'IBM_Store_Details';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('pageFindByPageId')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'pageFindByPageId',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PageIBMStoreDetails, void>({
			path: `/store/${storeId}/page/${pageId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Finds a page by its name.
	 *
	 * @tags Page
	 * @name PageFindByName
	 * @summary Get by name
	 * @request GET:/store/{storeId}/page/name/{name}
	 * @secure
	 * @response `200` `PageIBMStoreDetails` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	pageFindByName = (
		storeId: string,
		name: string,
		query: {
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName: 'IBM_Store_Summary' | 'IBM_Store_Details';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('pageFindByName')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'pageFindByName',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PageIBMStoreDetails, void>({
			path: `/store/${storeId}/page/name/${name}`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
