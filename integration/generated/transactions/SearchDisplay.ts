import { ComIbmCommerceCatalogCommandsSearchDisplayCmd } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class SearchDisplay<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Get search layout view by search term.
	 *
	 * @tags search-display
	 * @name SearchdisplayBySearchTermDetail
	 * @summary Get search layout view by search term.
	 * @request GET:/store/{storeId}/searchdisplay/bySearchTerm
	 * @secure
	 * @response `200` `ComIbmCommerceCatalogCommandsSearchDisplayCmd` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	searchdisplayBySearchTermDetail = (
		storeId: string,
		query: {
			/** The search term. */
			searchTerm: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('searchdisplayBySearchTermDetail')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'searchdisplayBySearchTermDetail',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceCatalogCommandsSearchDisplayCmd, void>({
			path: `/store/${storeId}/searchdisplay/bySearchTerm`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
