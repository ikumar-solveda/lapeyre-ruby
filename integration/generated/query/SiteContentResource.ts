import {
	CategorySuggestion,
	CommonSuggestions,
	KeywordSuggestion,
	ProductSuggestion,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class SiteContentResource<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Site-Content-Resource
	 * @name FindCategorySuggestions
	 * @summary Provides suggestions with type-ahead for search result page.
	 * @request GET:/store/{storeId}/sitecontent/categorySuggestions
	 * @response `200` `CategorySuggestion` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findCategorySuggestions = (
		storeId: string,
		query?: {
			/** Limit. */
			limit?: number;
			/** The number of suggested keywords to be returned. The default value is 4. */
			count?: number;
			/** The contractId */
			contractId?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** The sorting to be used in the returned result, "count" or "index". By default, it is "count". */
			termsSort?: boolean;
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findCategorySuggestions')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findCategorySuggestions',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CategorySuggestion, string>({
			path: `/store/${storeId}/sitecontent/categorySuggestions`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Site-Content-Resource
	 * @name FindKeywordSuggestionsByTerm
	 * @summary Provides keyword suggestions with type-ahead for search result page based on a term.
	 * @request GET:/store/{storeId}/sitecontent/keywordSuggestionsByTerm/{term}
	 * @response `200` `KeywordSuggestion` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findKeywordSuggestionsByTerm = (
		storeId: string,
		term: string,
		query?: {
			/** Limit. */
			limit?: string;
			/** The contractId */
			contractId?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** The sorting to be used in the returned result, "count" or "index". By default, it is "count". */
			termsSort?: boolean;
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findKeywordSuggestionsByTerm')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findKeywordSuggestionsByTerm',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<KeywordSuggestion, string>({
			path: `/store/${storeId}/sitecontent/keywordSuggestionsByTerm/${term}`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Site-Content-Resource
	 * @name FindSuggestions
	 * @summary Provides suggestions with type-ahead for search result page.
	 * @request GET:/store/{storeId}/sitecontent/suggestions
	 * @response `200` `CommonSuggestions` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findSuggestions = (
		storeId: string,
		query?: {
			/** The suggestion type. Accepted values are 'Category', 'Brand', 'Articles', 'Keyword', and 'Product'. */
			suggestType?: string;
			/** The search term. */
			term?: string;
			/** Limit. */
			limit?: string;
			/** The number of suggested keywords to be returned. The default value is 4. */
			count?: number;
			/** The contractId */
			contractId?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** The sorting to be used in the returned result, "count" or "index". By default, it is "count". */
			termsSort?: boolean;
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findSuggestions')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findSuggestions',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CommonSuggestions, string>({
			path: `/store/${storeId}/sitecontent/suggestions`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Site-Content-Resource
	 * @name FindProductSuggestionsBySearchTerm
	 * @summary Provides suggestions with type-ahead for search result page.
	 * @request GET:/store/{storeId}/sitecontent/productSuggestionsBySearchTerm/{searchTerm}
	 * @response `200` `ProductSuggestion` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findProductSuggestionsBySearchTerm = (
		storeId: string,
		searchTerm: string,
		query?: {
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work. */
			pageSize?: number;
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work. */
			pageNumber?: number;
			/** The search type is a numeric string which controls the query operator: ANY, OR, AND and control what data to be returned. For a detailed list of valid values, see the online documentation on Match type (_wcf.search.type). Known valid values include : 0: ANY (exclude SKU)1: EXACT (exclude SKU), 2: ALL (exclude SKU), 3: NONE (exclude SKU), 10: ANY (include SKU), 11: EXACT (include SKU), 12: ALL (include SKU), 13: NONE (include SKU), 100: ANY (only SKU), 101: EXACT (only SKU), 102: ALL (only SKU), 103: NONE (only SKU), 1000: ANY (include products, kits, bundles, category level SKU) (exclude product level SKU), 1001: EXACT (include products, kits, bundles, category level SKU) (exclude product level SKU), 1002: ALL (include products, kits, bundles, category level SKU) (exclude product level SKU), 1003: NONE (include products, kits, bundles, category level SKU) (exclude product level SKU), 10000: ANY (include category level SKU) (exclude products, kits, bundles, product level SKU), 10001: EXACT (include category level SKU) (exclude products, kits, bundles, product level SKU), 10002: ALL (include category level SKU) (exclude products, kits, bundles, product level SKU), 10003: NONE (include category level SKU) (exclude products, kits, bundles, product level SKU) */
			searchType?: number;
			/** The sorting to be used in the returned result, "count" or "index". By default, it is "count". */
			term?: boolean;
			/** The contractId */
			contractId?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** The sorting to be used in the returned result, "count" or "index". By default, it is "count". */
			termsSort?: boolean;
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** Option to force an entitlement check. */
			checkEntitlement?: boolean;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findProductSuggestionsBySearchTerm')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findProductSuggestionsBySearchTerm',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ProductSuggestion, string>({
			path: `/store/${storeId}/sitecontent/productSuggestionsBySearchTerm/${searchTerm}`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Site-Content-Resource
	 * @name FindBrandSuggestions
	 * @summary Provides suggestions with type-ahead for search result page.
	 * @request GET:/store/{storeId}/sitecontent/brandSuggestions
	 * @response `200` `CategorySuggestion` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findBrandSuggestions = (
		storeId: string,
		query?: {
			/** Limit. */
			limit?: number;
			/** The contractId */
			contractId?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** The sorting to be used in the returned result, "count" or "index". By default, it is "count". */
			termsSort?: boolean;
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findBrandSuggestions')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findBrandSuggestions',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CategorySuggestion, string>({
			path: `/store/${storeId}/sitecontent/brandSuggestions`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
}
