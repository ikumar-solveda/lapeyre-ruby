import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class V2CategoryResource<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags V2-Category-Resource
	 * @name GetV2CategoryResources
	 * @summary Gets Response for V2.0 API for store as per the requirements
	 * @request GET:/api/v2/categories
	 * @response `200` `string` default response
	 */
	getV2CategoryResources = (
		query: {
			storeId: string;
			identifier?: string[];
			id?: string[];
			parentCategoryId?: string;
			depthAndLimit?: string[];
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('getV2CategoryResources'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'getV2CategoryResources',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<string, any>({
			path: `/api/v2/categories`,
			method: 'GET',
			query: query,
			format: params.format ?? 'json',
			...params,
		});
	};
}
