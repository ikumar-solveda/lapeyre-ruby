import { ActivityResponse, Activityurls } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Activity<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags activity
	 * @name ActivityDetail
	 * @summary Gets the activity list by query type and parameters.
	 * @request GET:/store/{storeId}/activity
	 * @secure
	 * @response `200` `ActivityResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	activityDetail = (
		storeId: string,
		query: {
			emailPromotionId?: string;
			/** The query name. */
			q: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('activityDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'activityDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ActivityResponse, void>({
			path: `/store/${storeId}/activity`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags activity
	 * @name ActivityUrlsDetail
	 * @summary Resolve email activity urls
	 * @request GET:/store/{storeId}/activity/urls
	 * @secure
	 * @response `200` `Activityurls` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	activityUrlsDetail = (
		storeId: string,
		query?: {
			emailPromotionId?: string;
			urlHeader?: string;
			userId?: string;
			optOutForwardUrl?: string;
			clickedEventUrl?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('activityUrlsDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'activityUrlsDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<Activityurls, void>({
			path: `/store/${storeId}/activity/urls`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
