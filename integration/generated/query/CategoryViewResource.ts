import { CatalogGroupDetailArray, CatalogGroupDetailWithSequenceArray } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class CategoryViewResource<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Category-View-Resource
	 * @name FindCategoryByIdentifier
	 * @summary Gets category details based on its identifier (not the ID assigned by the database).
	 * @request GET:/store/{storeId}/categoryview/{categoryIdentifier}
	 * @response `200` `CatalogGroupDetailArray` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findCategoryByIdentifier = (
		storeId: string,
		categoryIdentifier: string,
		query?: {
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** The contractId */
			contractId?: string;
			/** The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency will be used. */
			currency?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** Option to force an entitlement check. */
			checkEntitlement?: boolean;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('findCategoryByIdentifier'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findCategoryByIdentifier',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CatalogGroupDetailArray, string>({
			path: `/store/${storeId}/categoryview/${categoryIdentifier}`,
			method: 'GET',
			query: query,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Category-View-Resource
	 * @name FindTopCategories
	 * @summary Gets all top level categories.
	 * @request GET:/store/{storeId}/categoryview/@top
	 * @response `200` `CatalogGroupDetailWithSequenceArray` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findTopCategories = (
		storeId: string,
		query?: {
			/** The comma separated list of numbers is used to control the depth of sub-categories and limit the number of items returned under each child category level. The first number in this list determines the maximum number of categories (first level sub-categories) to be returned under the immediate child category. The second number in the list determines the maximum number of categories to be returned under the first level sub-categories. A value of "-1" implies no limit. In that case, only the first level categories will be returned. For example, "pageSize=4&limitSubCategories=-1,3,0,1" implies that there will be unlimited first level sub-categories under the immediate child categories.  Under these categories (up to 4), all sub-categories will be returned and a maximum of 3 second level sub-categories will be returned. There will be no third level or fourth level since the third level limit is 0. Any level after a limit of 0 will be ignored. By default, no sub-category will be returned if this parameter is not specified. When the asterisk "*" is specified, it is considered the same as "-1" but, any subsequent levels will also be treated "-1". */
			depthAndLimit?: string;
			/** The field name to use when ordering the results. */
			orderBy?: string;
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** The contractId */
			contractId?: string;
			/** The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency will be used. */
			currency?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work. */
			pageSize?: number;
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work. */
			pageNumber?: number;
			/** Option to force an entitlement check. */
			checkEntitlement?: boolean;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('findTopCategories'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findTopCategories',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CatalogGroupDetailWithSequenceArray, string>({
			path: `/store/${storeId}/categoryview/@top`,
			method: 'GET',
			query: query,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Category-View-Resource
	 * @name FindSubCategories
	 * @summary Gets child categories based on the unique Id assigned to the parent category by the database.
	 * @request GET:/store/{storeId}/categoryview/byParentCategory/{parentCategoryId}
	 * @response `200` `CatalogGroupDetailWithSequenceArray` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findSubCategories = (
		storeId: string,
		parentCategoryId: string,
		query?: {
			/** The comma separated list of numbers is used to control the depth of sub-categories and limit the number of items returned under each child category level. The first number in this list determines the maximum number of categories (first level sub-categories) to be returned under the immediate child category. The second number in the list determines the maximum number of categories to be returned under the first level sub-categories. A value of "-1" implies no limit. In that case, only the first level categories will be returned. For example, "pageSize=4&limitSubCategories=-1,3,0,1" implies that there will be unlimited first level sub-categories under the immediate child categories.  Under these categories (up to 4), all sub-categories will be returned and a maximum of 3 second level sub-categories will be returned. There will be no third level or fourth level since the third level limit is 0. Any level after a limit of 0 will be ignored. By default, no sub-category will be returned if this parameter is not specified. When the asterisk "*" is specified, it is considered the same as "-1" but, any subsequent levels will also be treated "-1". */
			depthAndLimit?: string;
			/** The field name to use when ordering the results. */
			orderBy?: string;
			/** The contractId */
			contractId?: string;
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency will be used. */
			currency?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work. */
			pageSize?: number;
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work. */
			pageNumber?: number;
			/** Option to force an entitlement check. */
			checkEntitlement?: boolean;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('findSubCategories'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findSubCategories',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CatalogGroupDetailWithSequenceArray, string>({
			path: `/store/${storeId}/categoryview/byParentCategory/${parentCategoryId}`,
			method: 'GET',
			query: query,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Category-View-Resource
	 * @name FindCategoryByUniqueId
	 * @summary Gets category details based on the unique ID assigned to the category by the database.
	 * @request GET:/store/{storeId}/categoryview/byId/{categoryId}
	 * @response `200` `CatalogGroupDetailArray` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findCategoryByUniqueId = (
		storeId: string,
		categoryId: string,
		query?: {
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency will be used. */
			currency?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** The contractId */
			contractId?: string;
			/** Option to force an entitlement check. */
			checkEntitlement?: boolean;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('findCategoryByUniqueId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findCategoryByUniqueId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CatalogGroupDetailArray, string>({
			path: `/store/${storeId}/categoryview/byId/${categoryId}`,
			method: 'GET',
			query: query,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Category-View-Resource
	 * @name FindCategoriesByUniqueIds
	 * @summary Gets category details based on a list of unique IDs assigned to the categories by the database.
	 * @request GET:/store/{storeId}/categoryview/byIds
	 * @response `200` `CatalogGroupDetailArray` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findCategoriesByUniqueIds = (
		storeId: string,
		query: {
			id: string[];
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** The field name to use when ordering the results. */
			orderBy?: string;
			/** The contractId */
			contractId?: string;
			/** The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency will be used. */
			currency?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** Option to force an entitlement check. */
			checkEntitlement?: boolean;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('findCategoriesByUniqueIds'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findCategoriesByUniqueIds',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CatalogGroupDetailArray, string>({
			path: `/store/${storeId}/categoryview/byIds`,
			method: 'GET',
			query: query,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Category-View-Resource
	 * @name FindCategoryByIdentifiers
	 * @summary Gets category details based on category identifiers specified (not the id assigned by the database).
	 * @request GET:/store/{storeId}/categoryview/byIdentifiers
	 * @response `200` `CatalogGroupDetailArray` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findCategoryByIdentifiers = (
		storeId: string,
		query?: {
			identifier?: string[];
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** The field name to use when ordering the results. */
			orderBy?: string;
			/** The contractId */
			contractId?: string;
			/** The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency will be used. */
			currency?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** Option to force an entitlement check. */
			checkEntitlement?: boolean;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('findCategoryByIdentifiers'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findCategoryByIdentifiers',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CatalogGroupDetailArray, string>({
			path: `/store/${storeId}/categoryview/byIdentifiers`,
			method: 'GET',
			query: query,
			format: params.format ?? 'json',
			...params,
		});
	};
}
