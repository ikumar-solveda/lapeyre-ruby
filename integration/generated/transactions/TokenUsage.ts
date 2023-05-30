import { TokenusageTokenusage } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class TokenUsage<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets the feature version data.
	 *
	 * @tags Token Usage
	 * @name TokenUsageFindByAll
	 * @summary Get feature version data
	 * @request GET:/store/{storeId}/seo/tokenusage
	 * @secure
	 * @response `200` `TokenusageTokenusage` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	tokenUsageFindByAll = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'all' | 'findByAll';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('tokenUsageFindByAll')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'tokenUsageFindByAll',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<TokenusageTokenusage, void>({
			path: `/store/${storeId}/seo/tokenusage`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
