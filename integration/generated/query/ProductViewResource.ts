import { ProductDetail, ProductDetailArray, ProductSummaryArray } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class ProductViewResource<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Product-View-Resource
	 * @name FindProductByPartNumber
	 * @summary Gets products by part number.
	 * @request GET:/store/{storeId}/productview/{partNumber}
	 * @response `200` `ProductDetail` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findProductByPartNumber = (
		storeId: string,
		partNumber: string,
		query?: {
			/** The type of the merchandising association to be returned. */
			associationType?: string;
			/** The attribute associated keywords to be returned. */
			attributeKeyword?: string;
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
			/** The attachment filter. */
			attachmentFilter?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findProductByPartNumber')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findProductByPartNumber',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ProductDetail, string>({
			path: `/store/${storeId}/productview/${partNumber}`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Product-View-Resource
	 * @name FindProductByAPartNumber
	 * @summary Gets products by part number.
	 * @request GET:/store/{storeId}/productview/byPartNumber/{partNumber}
	 * @response `200` `ProductDetail` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findProductByAPartNumber = (
		storeId: string,
		partNumber: string,
		query?: {
			/** The type of the merchandising association to be returned. */
			associationType?: string;
			/** The attribute associated keywords to be returned. */
			attributeKeyword?: string;
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
			/** The attachment filter. */
			attachmentFilter?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findProductByAPartNumber')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findProductByAPartNumber',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ProductDetail, string>({
			path: `/store/${storeId}/productview/byPartNumber/${partNumber}`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Product-View-Resource
	 * @name FindProductsBySearchTerm
	 * @summary Gets product details based on a search term.
	 * @request GET:/store/{storeId}/productview/bySearchTerm/{searchTerm}
	 * @response `200` `ProductSummaryArray` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findProductsBySearchTerm = (
		storeId: string,
		searchTerm: string,
		query?: {
			/** The type of the merchandising association to be returned. */
			associationType?: string;
			/** The attribute associated keywords to be returned. */
			attributeKeyword?: string;
			/** The selected facets. */
			facet?: boolean;
			/** The multiple name-value pairs of the facet limit defining the maximum number of items to be returned under each facet. The sequence of limits honored alongside with the sequence of facet name-value pairs. */
			facetLimit?: string;
			/** The advanced facet list. */
			advancedFacetList?: string;
			/** The filter facet. */
			filterFacet?: string;
			/** The contractId */
			contractId?: string;
			/** The filter term. */
			filterTerm?: string;
			/** The manufacturer name. */
			manufacturer?: string;
			/** The minimum price. Based on the selected currency. */
			minPrice?: number;
			/** The maximum price for the product based on the selected currency. */
			maxPrice?: number;
			/** The field name to use when ordering the results. */
			orderBy?: string;
			/** The search type is a numeric string which controls the query operator: ANY, OR, AND and control what data to be returned. For a detailed list of valid values, see the online documentation on Match type (_wcf.search.type). Known valid values include : 0: ANY (exclude SKU)1: EXACT (exclude SKU), 2: ALL (exclude SKU), 3: NONE (exclude SKU), 10: ANY (include SKU), 11: EXACT (include SKU), 12: ALL (include SKU), 13: NONE (include SKU), 100: ANY (only SKU), 101: EXACT (only SKU), 102: ALL (only SKU), 103: NONE (only SKU), 1000: ANY (include products, kits, bundles, category level SKU) (exclude product level SKU), 1001: EXACT (include products, kits, bundles, category level SKU) (exclude product level SKU), 1002: ALL (include products, kits, bundles, category level SKU) (exclude product level SKU), 1003: NONE (include products, kits, bundles, category level SKU) (exclude product level SKU), 10000: ANY (include category level SKU) (exclude products, kits, bundles, product level SKU), 10001: EXACT (include category level SKU) (exclude products, kits, bundles, product level SKU), 10002: ALL (include category level SKU) (exclude products, kits, bundles, product level SKU), 10003: NONE (include category level SKU) (exclude products, kits, bundles, product level SKU) */
			searchType?: number;
			/** Option to force an entitlement check. */
			checkEntitlement?: boolean;
			/** The category identifier. */
			categoryId?: string;
			/** The list of physical store identifiers. */
			physicalStoreIds?: string;
			/** The attachment filter. */
			attachmentFilter?: string;
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency will be used. */
			currency?: string;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work. */
			pageSize?: number;
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work. */
			pageNumber?: number;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findProductsBySearchTerm')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findProductsBySearchTerm',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ProductSummaryArray, string>({
			path: `/store/${storeId}/productview/bySearchTerm/${searchTerm}`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Product-View-Resource
	 * @name FindProductsByCategory
	 * @summary Finds a product by its ID.
	 * @request GET:/store/{storeId}/productview/byCategory/{categoryId}
	 * @response `200` `ProductSummaryArray` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findProductsByCategory = (
		storeId: string,
		categoryId: string,
		query?: {
			/** The type of the merchandising association to be returned. */
			associationType?: string;
			/** The attribute associated keywords to be returned. */
			attributeKeyword?: string;
			/** The selected facets. */
			facet?: boolean;
			/** The multiple name-value pairs of the facet limit defining the maximum number of items to be returned under each facet. The sequence of limits honored alongside with the sequence of facet name-value pairs. */
			facetLimit?: string;
			/** The advanced facet list. */
			advancedFacetList?: string;
			/** The filter facet. */
			filterFacet?: string;
			/** The filter term. */
			filterTerm?: string;
			/** The manufacturer name. */
			manufacturer?: string;
			/** The contractId */
			contractId?: string;
			/** The minimum price. Based on the selected currency. */
			minPrice?: number;
			/** The maximum price for the product based on the selected currency. */
			maxPrice?: number;
			/** The field name to use when ordering the results. */
			orderBy?: string;
			/** The search type is a numeric string which controls the query operator: ANY, OR, AND and control what data to be returned. For a detailed list of valid values, see the online documentation on Match type (_wcf.search.type). Known valid values include : 0: ANY (exclude SKU)1: EXACT (exclude SKU), 2: ALL (exclude SKU), 3: NONE (exclude SKU), 10: ANY (include SKU), 11: EXACT (include SKU), 12: ALL (include SKU), 13: NONE (include SKU), 100: ANY (only SKU), 101: EXACT (only SKU), 102: ALL (only SKU), 103: NONE (only SKU), 1000: ANY (include products, kits, bundles, category level SKU) (exclude product level SKU), 1001: EXACT (include products, kits, bundles, category level SKU) (exclude product level SKU), 1002: ALL (include products, kits, bundles, category level SKU) (exclude product level SKU), 1003: NONE (include products, kits, bundles, category level SKU) (exclude product level SKU), 10000: ANY (include category level SKU) (exclude products, kits, bundles, product level SKU), 10001: EXACT (include category level SKU) (exclude products, kits, bundles, product level SKU), 10002: ALL (include category level SKU) (exclude products, kits, bundles, product level SKU), 10003: NONE (include category level SKU) (exclude products, kits, bundles, product level SKU) */
			searchType?: number;
			/** Option to force an entitlement check. */
			checkEntitlement?: boolean;
			/** The attachment filter. */
			attachmentFilter?: string;
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency will be used. */
			currency?: string;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work. */
			pageSize?: number;
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work. */
			pageNumber?: number;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findProductsByCategory')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findProductsByCategory',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ProductSummaryArray, string>({
			path: `/store/${storeId}/productview/byCategory/${categoryId}`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Product-View-Resource
	 * @name FindProductsByCategoryForAdmin
	 * @summary By default, this API returns all products under the category and subcategories by deep search. It does not only return products in the current category. There is no control over the limit of each subcategory under the category facet.
	 * @request GET:/store/{storeId}/productview/byCategoryForAdmin/{categoryId}
	 * @response `200` `ProductSummaryArray` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `401` `string` Not authenticated. The user session is not valid.
	 * @response `403` `string` The user is not authorized to perform the specified request.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findProductsByCategoryForAdmin = (
		storeId: string,
		categoryId: string,
		query?: {
			/** The type of the merchandising association to be returned. */
			associationType?: string;
			/** The attribute associated keywords to be returned. */
			attributeKeyword?: string;
			/** The selected facets. */
			facet?: string;
			/** The multiple name-value pairs of the facet limit defining the maximum number of items to be returned under each facet. The sequence of limits honored alongside with the sequence of facet name-value pairs. */
			facetLimit?: string;
			/** The advanced facet list. */
			advancedFacetList?: string;
			/** The filter facet. */
			filterFacet?: string;
			/** The filter term. */
			filterTerm?: string;
			/** The manufacturer name. */
			manufacturer?: string;
			/** The contractId */
			contractId?: string;
			/** The minimum price. Based on the selected currency. */
			minPrice?: string;
			/** The maximum price for the product based on the selected currency. */
			maxPrice?: string;
			/** The field name to use when ordering the results. */
			orderBy?: string;
			/** The search type is a numeric string which controls the query operator: ANY, OR, AND and control what data to be returned. For a detailed list of valid values, see the online documentation on Match type (_wcf.search.type). Known valid values include : 0: ANY (exclude SKU)1: EXACT (exclude SKU), 2: ALL (exclude SKU), 3: NONE (exclude SKU), 10: ANY (include SKU), 11: EXACT (include SKU), 12: ALL (include SKU), 13: NONE (include SKU), 100: ANY (only SKU), 101: EXACT (only SKU), 102: ALL (only SKU), 103: NONE (only SKU), 1000: ANY (include products, kits, bundles, category level SKU) (exclude product level SKU), 1001: EXACT (include products, kits, bundles, category level SKU) (exclude product level SKU), 1002: ALL (include products, kits, bundles, category level SKU) (exclude product level SKU), 1003: NONE (include products, kits, bundles, category level SKU) (exclude product level SKU), 10000: ANY (include category level SKU) (exclude products, kits, bundles, product level SKU), 10001: EXACT (include category level SKU) (exclude products, kits, bundles, product level SKU), 10002: ALL (include category level SKU) (exclude products, kits, bundles, product level SKU), 10003: NONE (include category level SKU) (exclude products, kits, bundles, product level SKU) */
			searchType?: string;
			/** Option to force an entitlement check. */
			checkEntitlement?: string;
			/** The attachment filter. */
			attachmentFilter?: string;
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency will be used. */
			currency?: string;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work. */
			pageSize?: string;
			/** Used to display debug info. Set to 'true' to display sequence score. */
			debug?: string;
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work. */
			pageNumber?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findProductsByCategoryForAdmin')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findProductsByCategoryForAdmin',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ProductSummaryArray, string>({
			path: `/store/${storeId}/productview/byCategoryForAdmin/${categoryId}`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Product-View-Resource
	 * @name FindProductByPartNumbers
	 * @summary Gets products by part numbers.
	 * @request GET:/store/{storeId}/productview/byPartNumbers
	 * @response `200` `ProductDetailArray` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findProductByPartNumbers = (
		storeId: string,
		query: {
			partNumber: string[];
			/** The type of the merchandising association to be returned. */
			associationType?: string;
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
			/** The attachment filter. */
			attachmentFilter?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findProductByPartNumbers')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findProductByPartNumbers',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ProductDetailArray, string>({
			path: `/store/${storeId}/productview/byPartNumbers`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Product-View-Resource
	 * @name FindProductsByIds
	 * @summary Gets product details based on the product ID.
	 * @request GET:/store/{storeId}/productview/byIds
	 * @response `200` `ProductDetail` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findProductsByIds = (
		storeId: string,
		query: {
			id: string[];
			/** The type of the merchandising association to be returned. */
			associationType?: string;
			/** The attribute associated keywords to be returned. */
			attributeKeyword?: string;
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
			/** The attachment filter. */
			attachmentFilter?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findProductsByIds')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findProductsByIds',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ProductDetail, string>({
			path: `/store/${storeId}/productview/byIds`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Product-View-Resource
	 * @name FindProductById
	 * @summary Gets product details based on the product ID.
	 * @request GET:/store/{storeId}/productview/byId/{productId}
	 * @response `200` `ProductDetail` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findProductById = (
		storeId: string,
		productId: string,
		query?: {
			/** The type of the merchandising association to be returned. */
			associationType?: string;
			/** The attribute associated keywords to be returned. */
			attributeKeyword?: string;
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
			/** The attachment filter. */
			attachmentFilter?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findProductById')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findProductById',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ProductDetail, string>({
			path: `/store/${storeId}/productview/byId/${productId}`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
}
