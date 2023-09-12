import { UrlkeywordUrlkeyword } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class UrlKeyword<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets the feature version data.
	 *
	 * @tags URL Keyword
	 * @name UrlKeywordFindByTokenName
	 * @summary Get feature version data
	 * @request GET:/store/{storeId}/seo/urlkeyword
	 * @secure
	 * @response `200` `UrlkeywordUrlkeyword` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	urlKeywordFindByTokenName = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byLanguageIdAndTokenNameValue' | 'byTokenName';
			/** The input token name. */
			tokenName: string;
			/** The input token value. */
			tokenValue: string;
			/** the return language of the query token. */
			languageId: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('urlKeywordFindByTokenName'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'urlKeywordFindByTokenName',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<UrlkeywordUrlkeyword, void>({
			path: `/store/${storeId}/seo/urlkeyword`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
