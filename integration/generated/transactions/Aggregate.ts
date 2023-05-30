import { Empty } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Aggregate<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags aggregate
	 * @name AggregateDetail
	 * @summary Finds an aggregate by a query.
	 * @request GET:/store/{storeId}/aggregate
	 * @secure
	 * @response `200` `Empty` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	aggregateDetail = (
		storeId: string,
		query: {
			/** The query name. The possible values are: contentPageAggregateByPageId, contentPageAggregateByPageName, categoryPageAggregateByCategoryId. */
			q: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('aggregateDetail')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'aggregateDetail',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<Empty, void>({
			path: `/store/${storeId}/aggregate`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
