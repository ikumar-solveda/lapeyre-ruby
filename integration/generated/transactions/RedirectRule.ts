import { RedirectruleRedirectrule } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class RedirectRule<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets the feature version data.
	 *
	 * @tags Redirect Rule
	 * @name RedirectRuleFindByOriginalUrlKeywordIds
	 * @summary Get feature version data
	 * @request GET:/store/{storeId}/seo/redirectrule
	 * @secure
	 * @response `200` `RedirectruleRedirectrule` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	redirectRuleFindByOriginalUrlKeywordIds = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byOriginalUrlKeywordIds';
			/** The keyword ID. */
			origUrlKeywordId: string[];
		},
		params: RequestParams = {}
	) => {
		if (
			!this.traceDetails ||
			this.traceDetails.includes('redirectRuleFindByOriginalUrlKeywordIds')
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'redirectRuleFindByOriginalUrlKeywordIds',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<RedirectruleRedirectrule, void>({
			path: `/store/${storeId}/seo/redirectrule`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
