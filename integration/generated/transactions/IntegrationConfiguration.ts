import {
	ComIbmCommerceInfrastructureBeansIntegrationConfigurationDataBean,
	ComIbmCommerceInfrastructureBeansIntegrationConfigurationSessionKey,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class IntegrationConfiguration<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets integration configurations. Can only be called after logging in as an integration user. As such, requests must be sent with an integration user cookie or token. An integration user is a user in the RemoteConfigurationReader member group.
	 *
	 * @tags Integration Configuration
	 * @name IntegrationConfigurationGetConfiguration
	 * @summary Get configuration
	 * @request GET:/integration_configuration
	 * @secure
	 * @response `200` `ComIbmCommerceInfrastructureBeansIntegrationConfigurationDataBean` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	integrationConfigurationGetConfiguration = (
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (
			!this.traceDetails ||
			this.traceDetails.includes('integrationConfigurationGetConfiguration')
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'integrationConfigurationGetConfiguration',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceInfrastructureBeansIntegrationConfigurationDataBean,
			void
		>({
			path: `/integration_configuration`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Gets integration session key configuration. Can only be called after logging in as an integration user. As such, requests must be sent with an integration user cookie or token. An integration user is a user in the RemoteConfigurationReader member group.
	 *
	 * @tags Integration Configuration
	 * @name IntegrationConfigurationGetEncryptedSessionKey
	 * @summary Get integration session key configuration
	 * @request GET:/integration_configuration/session_key
	 * @secure
	 * @response `200` `ComIbmCommerceInfrastructureBeansIntegrationConfigurationSessionKey` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	integrationConfigurationGetEncryptedSessionKey = (
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (
			!this.traceDetails ||
			this.traceDetails.includes('integrationConfigurationGetEncryptedSessionKey')
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'integrationConfigurationGetEncryptedSessionKey',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceInfrastructureBeansIntegrationConfigurationSessionKey,
			void
		>({
			path: `/integration_configuration/session_key`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
