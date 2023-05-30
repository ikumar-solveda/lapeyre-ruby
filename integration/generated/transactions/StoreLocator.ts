import { StorelocatorStorelocator } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class StoreLocator<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets store location information by a specified location.
	 *
	 * @tags Store Locator
	 * @name StoreLocatorFindGeoNodeByGeoLocation
	 * @summary Get by specified location
	 * @request GET:/store/{storeId}/storelocator/byLocation
	 * @secure
	 * @response `200` `StorelocatorStorelocator` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` No physical store is found for the criteria provided.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	storeLocatorFindGeoNodeByGeoLocation = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The city. */
			city?: string;
			/** The state. */
			state?: string;
			/** The province. */
			prov?: string;
			/** The country. */
			country?: string;
			/** The radius unit of measure. */
			radiusUOM?: string;
			/** The physical store attribute name that describes whether the store is a beauty center. */
			BeautyCenter?: string;
			/** The physical store attribute name to describe the type of the store. */
			Type?: string;
			/** The radius. */
			radius?: string;
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
			/** If it is 'true', a site level physical search is performed.  Otherwise, the physical store search is performed at the web store level. By default, it is 'true'. */
			siteLevelStoreSearch?: 'true' | 'false';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('storeLocatorFindGeoNodeByGeoLocation')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'storeLocatorFindGeoNodeByGeoLocation',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<StorelocatorStorelocator, void>({
			path: `/store/${storeId}/storelocator/byLocation`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Gets store location information by a store unique ID.
	 *
	 * @tags Store Locator
	 * @name StoreLocatorFindByStoreUniqueId
	 * @summary Get by store unique ID
	 * @request GET:/store/{storeId}/storelocator/byStoreId/{uniqueId}
	 * @secure
	 * @response `200` `StorelocatorStorelocator` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	storeLocatorFindByStoreUniqueId = (
		storeId: string,
		uniqueId: string,
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
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('storeLocatorFindByStoreUniqueId')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'storeLocatorFindByStoreUniqueId',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<StorelocatorStorelocator, void>({
			path: `/store/${storeId}/storelocator/byStoreId/${uniqueId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Gets store location information by one to n store unique IDs.
	 *
	 * @tags Store Locator
	 * @name StoreLocatorFindByStoreUniqueIds
	 * @summary Get by store unique IDs
	 * @request GET:/store/{storeId}/storelocator/byStoreIds
	 * @secure
	 * @response `200` `StorelocatorStorelocator` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	storeLocatorFindByStoreUniqueIds = (
		storeId: string,
		query: {
			/** A list of physical store unique identifiers. */
			physicalStoreId: string[];
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
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('storeLocatorFindByStoreUniqueIds')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'storeLocatorFindByStoreUniqueIds',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<StorelocatorStorelocator, void>({
			path: `/store/${storeId}/storelocator/byStoreIds`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Gets store location information by specified coordinates.
	 *
	 * @tags Store Locator
	 * @name StoreLocatorFindStores
	 * @summary Get by specified coordinates
	 * @request GET:/store/{storeId}/storelocator/latitude/{latitude}/longitude/{longitude}
	 * @secure
	 * @response `200` `StorelocatorStorelocator` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	storeLocatorFindStores = (
		storeId: string,
		latitude: string,
		longitude: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The maximum number of stores to return. */
			maxItems?: string;
			/** The radius unit of measure. */
			radiusUOM?: string;
			/** The physical store attribute name that describes whether the store is a beauty center. */
			BeautyCenter?: string;
			/** The physical store attribute name to describe the type of the store. */
			Type?: string;
			/** The radius. */
			radius?: string;
			/** If it is 'true', a site level physical search is performed.  Otherwise, the physical store search is performed at the web store level. By default, it is 'true'. */
			siteLevelStoreSearch?: 'true' | 'false';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('storeLocatorFindStores')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'storeLocatorFindStores',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<StorelocatorStorelocator, void>({
			path: `/store/${storeId}/storelocator/latitude/${latitude}/longitude/${longitude}`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Gets store location information by a geo node unique ID.
	 *
	 * @tags Store Locator
	 * @name StoreLocatorFindGeoNodeByGeoId
	 * @summary Get by geo node unique ID
	 * @request GET:/store/{storeId}/storelocator/byGeoNode/{geoId}
	 * @secure
	 * @response `200` `StorelocatorStorelocator` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	storeLocatorFindGeoNodeByGeoId = (
		storeId: string,
		geoId: string,
		query?: {
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
			/** The physical store attribute name that describes whether the store is a beauty center. */
			BeautyCenter?: string;
			/** The physical store attribute name to describe the type of the store. */
			Type?: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** If it is 'true', a site level physical search is performed.  Otherwise, the physical store search is performed at the web store level. By default, it is 'true'. */
			siteLevelStoreSearch?: 'true' | 'false';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('storeLocatorFindGeoNodeByGeoId')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'storeLocatorFindGeoNodeByGeoId',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<StorelocatorStorelocator, void>({
			path: `/store/${storeId}/storelocator/byGeoNode/${geoId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
