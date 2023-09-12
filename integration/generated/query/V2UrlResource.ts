import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class V2UrlResource<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags V2-Url-Resource
	 * @name GetV2CategoryResources1
	 * @summary Gets Response for V2.0 API Seo url data
	 * @request GET:/api/v2/urls
	 * @response `200` `string` default response
	 */
	getV2CategoryResources1 = (
		query: {
			/** @format int32 */
			storeId: number;
			identifier?: string[];
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('getV2CategoryResources1'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'getV2CategoryResources1',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<string, any>({
			path: `/api/v2/urls`,
			method: 'GET',
			query: query,
			format: params.format ?? 'json',
			...params,
		});
	};
}
