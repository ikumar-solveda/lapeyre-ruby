import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class SearchDocumentResource<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Search-Document-Resource
	 * @name GetMarketingESpotData
	 * @summary Gets BOD data.
	 * @request POST:/api/v2/documents/bod
	 * @response `200` `string` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	getMarketingESpotData = (data: string, params: RequestParams = {}) => {
		if (!this.traceDetails || this.traceDetails.includes('getMarketingESpotData')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: data ?? {},
				methodName: 'getMarketingESpotData',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<string, string>({
			path: `/api/v2/documents/bod`,
			method: 'POST',
			body: data,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
}
