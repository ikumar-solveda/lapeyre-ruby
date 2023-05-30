import { ExtendedloggerBehavior } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Extendedlogger<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Update configuration of extended logger asynchronously.
	 *
	 * @tags extendedlogger
	 * @name AsyncconfigUpdate
	 * @summary Update configuration of extended logger asynchronously.
	 * @request PUT:/extendedlogger/asyncconfig
	 * @secure
	 * @response `200` `ExtendedloggerBehavior` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	asyncconfigUpdate = (
		query?: {
			/** This enable flag is used to enable/disable the extended logging. */
			enableFlag?: string;
			/** This custom fields query param is used to set the customized extended log for their own specification. */
			customFields?: string;
			/** This registration flag is used to register/unregister the custom fields.  When registrationFlag value is false, and customFields doesn't exist, it means to unregister all custom fields. */
			registrationFlag?: string;
			/** This container names is used to assign the containers who will be enabled extended logging. */
			containerNames?: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('asyncconfigUpdate')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'asyncconfigUpdate',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ExtendedloggerBehavior, void>({
			path: `/extendedlogger/asyncconfig`,
			method: 'PUT',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
