import { ConfigurationConfiguration } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Configuration<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets configuration details by the specified identifier.
	 *
	 * @tags Configuration
	 * @name ConfigurationFindByConfigurationId
	 * @summary Get details by ID
	 * @request GET:/store/{storeId}/configuration/{configurationId}
	 * @secure
	 * @response `200` `ConfigurationConfiguration` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	configurationFindByConfigurationId = (
		storeId: string,
		configurationId: string,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('configurationFindByConfigurationId')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'configurationFindByConfigurationId',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ConfigurationConfiguration, void>({
			path: `/store/${storeId}/configuration/${configurationId}`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Gets configuration details by one or more specified identifiers.
	 *
	 * @tags Configuration
	 * @name ConfigurationFindByQuery
	 * @summary Get details by specified identifiers
	 * @request GET:/store/{storeId}/configuration
	 * @secure
	 * @response `200` `ConfigurationConfiguration` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	configurationFindByQuery = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byConfigurationIds' | 'all';
			/** The store identifier. */
			configurationId: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('configurationFindByQuery')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'configurationFindByQuery',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ConfigurationConfiguration, void>({
			path: `/store/${storeId}/configuration`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
