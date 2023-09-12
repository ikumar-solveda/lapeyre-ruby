import {
	ComIbmCommerceOrderCalculationCalculationRuleCombineCmd,
	ComIbmCommerceRestStoreHandlerStoreHandlerRemoteConfig,
	ComIbmCommerceRestStoreHandlerStoreHandlerStoreInformation,
	StoreDatabeanResponse,
	StoreFeaturesList,
	StoreStore,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Store<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags store
	 * @name RemoteConfigDetail
	 * @summary Gets reomte store configs.
	 * @request GET:/store/{storeId}/remoteConfig
	 * @secure
	 * @response `200` `ComIbmCommerceRestStoreHandlerStoreHandlerRemoteConfig` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	remoteConfigDetail = (
		storeId: string,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('remoteConfigDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'remoteConfigDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestStoreHandlerStoreHandlerRemoteConfig, void>({
			path: `/store/${storeId}/remoteConfig`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @name SummaryStore
	 * @request SUMMARY:/store/{storeId}/requisition_list/{requisitionListId}
	 * @secure
	 */
	summaryStore = (storeId: string, requisitionListId: string, params: RequestParams = {}) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (loggerCan('trace') && (!this.traceDetails || this.traceDetails.includes('summaryStore'))) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'summaryStore',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<any, any>({
			path: `/store/${storeId}/requisition_list/${requisitionListId}`,
			method: 'SUMMARY',
			secure: true,
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @name SummaryStore2
	 * @request SUMMARY:/store/{storeId}/display_tax
	 * @originalName summaryStore
	 * @duplicate
	 * @secure
	 */
	summaryStore2 = (storeId: string, params: RequestParams = {}) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (loggerCan('trace') && (!this.traceDetails || this.traceDetails.includes('summaryStore2'))) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'summaryStore2',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<any, any>({
			path: `/store/${storeId}/display_tax`,
			method: 'SUMMARY',
			secure: true,
			...params,
		});
	};
	/**
	 * @description Gets tax information by the specified query.
	 *
	 * @tags Store
	 * @name StoreFindByQueryTaxInformation
	 * @summary Get tax information by query
	 * @request GET:/store/{storeId}/taxInformation
	 * @secure
	 * @response `200` `ComIbmCommerceOrderCalculationCalculationRuleCombineCmd` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	storeFindByQueryTaxInformation = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'getSalesTaxCalculationRule';
			/** The high range. */
			high?: string;
			/** The low range. */
			low?: string;
			/** The storeIdentifier. */
			storeIdentifier?: string;
			/** The usage. */
			usage?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a query. */
			profileName?: 'IBM_Store_Summary';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('storeFindByQueryTaxInformation'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'storeFindByQueryTaxInformation',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceOrderCalculationCalculationRuleCombineCmd, void>({
			path: `/store/${storeId}/taxInformation`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets online store information by the specified query.
	 *
	 * @tags Store
	 * @name StoreFindByQueryOnlineStore
	 * @summary Get store information by query
	 * @request GET:/store/{storeId}/online_store
	 * @secure
	 * @response `200` `StoreStore` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	storeFindByQueryOnlineStore = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'findOnlineStoresByRange' | 'findOnlineStore';
			/** The high range. */
			high?: string;
			/** The low range. */
			low?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('storeFindByQueryOnlineStore'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'storeFindByQueryOnlineStore',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<StoreStore, void>({
			path: `/store/${storeId}/online_store`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets store details by the specified store name and usage.
	 *
	 * @tags Store
	 * @name StoreFindByStoreNameAndUsage
	 * @summary Get store details by name and usage
	 * @request GET:/store/{storeId}/adminLookup
	 * @secure
	 * @response `200` `StoreStore` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	storeFindByStoreNameAndUsage = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'findAllByUsage' | 'findByStoreNameAndUsage' | 'findByStoreIdentifier';
			/** The store identifier */
			storeIdentifier?: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'json' | 'xml';
			/** The store name. */
			storeName?: string;
			/** The usage. */
			usage?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('storeFindByStoreNameAndUsage'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'storeFindByStoreNameAndUsage',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<StoreStore, void>({
			path: `/store/${storeId}/adminLookup`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets top-level resource URLs.
	 *
	 * @tags Store
	 * @name StoreFetchStore
	 * @summary Get top-level resource URLs
	 * @request GET:/store/{storeId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestStoreHandlerStoreHandlerStoreInformation` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	storeFetchStore = (
		storeId: string,
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
			(!this.traceDetails || this.traceDetails.includes('storeFetchStore'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'storeFetchStore',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestStoreHandlerStoreHandlerStoreInformation, void>({
			path: `/store/${storeId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets information about a specific store ID. Can only be called after logging in as an integration user. As such, requests must be sent with an integration user cookie or token. An integration user is a user in the RemoteConfigurationReader member group.
	 *
	 * @tags Store
	 * @name StoreFindDataBean
	 * @summary Get store information by store ID
	 * @request GET:/store/{storeId}/databean
	 * @secure
	 * @response `200` `StoreDatabeanResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	storeFindDataBean = (
		storeId: string,
		query?: {
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: string;
			jspStoreDir?: string;
			storeRelationshipTypeName?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('storeFindDataBean'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'storeFindDataBean',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<StoreDatabeanResponse, void>({
			path: `/store/${storeId}/databean`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets a list of enabled store features.
	 *
	 * @tags Store
	 * @name StoreGetFeatureList
	 * @summary Gets a list of enabled store features.
	 * @request GET:/store/{storeId}/features
	 * @secure
	 * @response `200` `StoreFeaturesList` The request completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	storeGetFeatureList = (storeId: string, params: RequestParams = {}) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('storeGetFeatureList'))
		) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'storeGetFeatureList',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<StoreFeaturesList, void>({
			path: `/store/${storeId}/features`,
			method: 'GET',
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
