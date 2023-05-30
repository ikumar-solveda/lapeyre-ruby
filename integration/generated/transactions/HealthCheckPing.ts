import { Empty } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class HealthCheckPing<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags healthCheckPing
	 * @name PingList
	 * @summary Checks the health status of ts.
	 * @request GET:/health/ping
	 * @secure
	 * @response `200` `Empty` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	pingList = (params: RequestParams = {}) => {
		if (!this.traceDetails || this.traceDetails.includes('pingList')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'pingList',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<Empty, void>({
			path: `/health/ping`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	};
}
