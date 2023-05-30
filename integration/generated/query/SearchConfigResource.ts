import { BreadCrumbTrailEntryViewExtended } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class SearchConfigResource<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Search-Config-Resource
	 * @name GetConfigurationData
	 * @summary Get the configuration node data.
	 * @request GET:/api/v2/configuration
	 * @response `200` `BreadCrumbTrailEntryViewExtended` The request is completed successfully.
	 * @response `400` `BreadCrumbTrailEntryViewExtended` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `500` `BreadCrumbTrailEntryViewExtended` Internal server error. Additional details will be contained on the server logs.
	 */
	getConfigurationData = (
		query: {
			nodeName: string;
			/** Locale name */
			locale?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('getConfigurationData')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'getConfigurationData',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<BreadCrumbTrailEntryViewExtended, BreadCrumbTrailEntryViewExtended>({
			path: `/api/v2/configuration`,
			method: 'GET',
			query: query,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Search-Config-Resource
	 * @name AddConfiguration
	 * @summary Create the configuration node in ZooKeeper.
	 * @request POST:/api/v2/configuration
	 * @response `201` `Record<string, string>` The requested resource has been created.
	 * @response `400` `Record<string, string>` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `500` `Record<string, string>` Internal server error. Additional details will be contained on the server logs.
	 */
	addConfiguration = (
		query: {
			nodeName: string;
			/** Locale name */
			locale?: string;
		},
		data: string,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('addConfiguration')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'addConfiguration',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<Record<string, string>, Record<string, string>>({
			path: `/api/v2/configuration`,
			method: 'POST',
			query: query,
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Search-Config-Resource
	 * @name UpdateColorConfiguration
	 * @summary Update the configuration node in ZooKeeper.
	 * @request PATCH:/api/v2/configuration
	 * @response `201` `Record<string, string>` The requested resource has been created.
	 * @response `400` `Record<string, string>` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `500` `Record<string, string>` Internal server error. Additional details will be contained on the server logs.
	 */
	updateColorConfiguration = (
		query: {
			nodeName: string;
			/** Locale name */
			locale?: string;
		},
		data: string,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('updateColorConfiguration')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'updateColorConfiguration',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<Record<string, string>, Record<string, string>>({
			path: `/api/v2/configuration`,
			method: 'PATCH',
			query: query,
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
}
