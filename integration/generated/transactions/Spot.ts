import {
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer,
	ComIbmCommerceRestMarketingHandlerESpotDataHandlerSearchTermsContainer,
	EspotEspot,
	SpotSpot,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Spot<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets an e-Marketing Spot in a store using its unique identifier.
	 *
	 * @tags Spot
	 * @name SpotFindSpotById
	 * @summary Get e-Marketing Spots by unique identifier
	 * @request GET:/store/{storeId}/spot/{spotId}
	 * @secure
	 * @response `200` `SpotSpot` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	spotFindSpotById = (
		storeId: string,
		spotId: number,
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
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('spotFindSpotById'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'spotFindSpotById',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<SpotSpot, void>({
			path: `/store/${storeId}/spot/${spotId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets e-Marketing Spot data.
	 *
	 * @tags Spot
	 * @name ESpotFindESpotData
	 * @summary Get e-Marketing Sport data
	 * @request GET:/store/{storeId}/espot/{name}/type/{type}
	 * @secure
	 * @response `200` `EspotEspot` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	eSpotFindESpotData = (
		storeId: string,
		name: string,
		type: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The catalog identifier. If none is specified, the store default catalog is used. */
			catalogId?: string;
			/**
			 * The currency code to use for example, currency=USD. If no currency code is specified, the store default currency is used.
			 * @example USD
			 */
			currency?: string;
			/** E-Spot name. */
			name?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('eSpotFindESpotData'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'eSpotFindESpotData',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<EspotEspot, void>({
			path: `/store/${storeId}/espot/${name}/type/${type}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets e-Marketing Spots in a store.
	 *
	 * @tags Spot
	 * @name SpotFindSpotsByQuery
	 * @summary Get e-Marketing Spots
	 * @request GET:/store/{storeId}/spot
	 * @secure
	 * @response `200` `SpotSpot` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	spotFindSpotsByQuery = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byType' | 'byTypeAndName';
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** Type of the e-spot. For instance : qType=MARKETING or STOREFEATURE Required for search by type. */
			qType?: string;
			/** Name of the e-spot used to find all spots with at least a partial match in the name or description. Required for search by name. */
			qName?: string;
			/** The catalog identifier. If none is specified, the store default catalog is used. */
			catalogId?: string;
			/** Page size. Used to limit the amount of data returned by a query. Valid values are integers starting with 1. Use pageSize with pageNumber. */
			pageSize?: string;
			/** Page number. Valid values are positive integers starting at 1. Use pageNumber with pageSize. */
			pageNumber?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('spotFindSpotsByQuery'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'spotFindSpotsByQuery',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<SpotSpot, void>({
			path: `/store/${storeId}/spot`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description "Deprecated: Gets an e-Marketing Spot for a specific product. Alternatively, this can be implemented using the findByName method with the following URL: store/{storeId}/espot/{name}?productId=&DM_ReqCmd=ProductDisplay."
	 *
	 * @tags Spot
	 * @name ESpotFindByNameWithProduct
	 * @summary Get e-Marketing Sport for product
	 * @request GET:/store/{storeId}/espot/{name}/product/{productId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	eSpotFindByNameWithProduct = (
		name: string,
		storeId: string,
		productId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The catalog identifier. If none is specified, the store default catalog is used. */
			catalogId?: string;
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
			(!this.traceDetails || this.traceDetails.includes('eSpotFindByNameWithProduct'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'eSpotFindByNameWithProduct',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer,
			void
		>({
			path: `/store/${storeId}/espot/${name}/product/${productId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description "Deprecated: Gets an e-Marketing Spot at a specific category level. For example, Furniture. Alternatively, this can be implemented using the findByName method with the following URL: store/{storeId}/espot/{name}?categoryId=&DM_ReqCmd=CategoryDisplay."
	 *
	 * @tags Spot
	 * @name EspotCategoryDetail
	 * @summary Get e-Marketing Spot by category
	 * @request GET:/store/{storeId}/espot/{name}/category/{categoryId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	espotCategoryDetail = (
		name: string,
		storeId: string,
		categoryId: string,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: 'xml' | 'json';
			/** The catalog identifier. If none is specified, the store default catalog shall be used. */
			catalogId?: string;
			/**
			 * The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
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
			(!this.traceDetails || this.traceDetails.includes('espotCategoryDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'espotCategoryDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer,
			void
		>({
			path: `/store/${storeId}/espot/${name}/category/${categoryId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets an e-Marketing Spot by name.
	 *
	 * @tags Spot
	 * @name ESpotFindByName
	 * @summary Get e-Marketing Spot by name
	 * @request GET:/store/{storeId}/espot/{name}
	 * @secure
	 * @response `200` `ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	eSpotFindByName = (
		name: string,
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The catalog identifier. If none is specified, the store default catalog is used. */
			catalogId?: string;
			/**
			 * The currency code to use for example, currency=USD. If no currency code is specified, the store default currency is used.
			 * @example USD
			 */
			currency?: string;
			/** E-Spot name. */
			name?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('eSpotFindByName'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'eSpotFindByName',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMarketingHandlerESpotDataHandlerESpotContainer,
			void
		>({
			path: `/store/${storeId}/espot/${name}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets all search terms that have search rules.
	 *
	 * @tags Spot
	 * @name ESpotFindAllSearchTerms
	 * @summary Get search terms with search rules
	 * @request GET:/store/{storeId}/espot
	 * @secure
	 * @response `200` `ComIbmCommerceRestMarketingHandlerESpotDataHandlerSearchTermsContainer` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	eSpotFindAllSearchTerms = (
		storeId: string,
		query: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: string;
			/** The query name. */
			q: 'allSearchTerms';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('eSpotFindAllSearchTerms'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'eSpotFindAllSearchTerms',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMarketingHandlerESpotDataHandlerSearchTermsContainer,
			void
		>({
			path: `/store/${storeId}/espot`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
