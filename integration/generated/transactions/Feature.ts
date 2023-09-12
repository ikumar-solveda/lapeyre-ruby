import { ComIbmCommerceRestConfigFeatureHandlerFeatureResponse } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Feature<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags feature
	 * @name FeatureDetail
	 * @summary Finds all features supported.
	 * @request GET:/store/{storeId}/feature
	 * @secure
	 * @response `200` `ComIbmCommerceRestConfigFeatureHandlerFeatureResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	featureDetail = (storeId: string, params: RequestParams = {}) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (loggerCan('trace') && (!this.traceDetails || this.traceDetails.includes('featureDetail'))) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'featureDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestConfigFeatureHandlerFeatureResponse, void>({
			path: `/store/${storeId}/feature`,
			method: 'GET',
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
