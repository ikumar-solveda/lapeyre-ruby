import { TokenToken } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Token<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets the feature version data.
	 *
	 * @tags Token
	 * @name TokenFindByUrlKeywordNames
	 * @summary Get feature version data
	 * @request GET:/store/{storeId}/seo/token
	 * @secure
	 * @response `200` `TokenToken` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	tokenFindByUrlKeywordNames = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byUrlKeywordNames';
			/** The input urlKeyword names. */
			urlKeywordName: string[];
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('tokenFindByUrlKeywordNames')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'tokenFindByUrlKeywordNames',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<TokenToken, void>({
			path: `/store/${storeId}/seo/token`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
