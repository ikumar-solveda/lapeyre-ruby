import {
	ComIbmCommerceMarketingBeansUserBehaviorListDataBeanIBMAdminSummary,
	ComIbmCommerceRestMarketingHandlerUserBehaviorHandlerDeleteUserBehaviorResponse,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class UserBehavior<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags User Behavior
	 * @name DeleteUserBehaviorData
	 * @summary Delete the marketing tracking data for a user for the store.
	 * @request DELETE:/store/{storeId}/user_behavior/{userId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestMarketingHandlerUserBehaviorHandlerDeleteUserBehaviorResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `404` `void` The specified resource couldn't be found.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	deleteUserBehaviorData = (
		storeId: '0' | '10001' | '10501' | '11001' | '1',
		userId: number,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('deleteUserBehaviorData'))
		) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'deleteUserBehaviorData',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMarketingHandlerUserBehaviorHandlerDeleteUserBehaviorResponse,
			void
		>({
			path: `/store/${storeId}/user_behavior/${userId}`,
			method: 'DELETE',
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags User Behavior
	 * @name FindUserBehaviors
	 * @summary Get the marketing tracking data for a user for the store.
	 * @request GET:/store/{storeId}/user_behavior
	 * @secure
	 * @response `200` `ComIbmCommerceMarketingBeansUserBehaviorListDataBeanIBMAdminSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `404` `void` The specified resource couldn't be found.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	findUserBehaviors = (
		storeId: '0' | '10001' | '10501' | '11001' | '1',
		query?: {
			/** The user ID */
			userId?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('findUserBehaviors'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findUserBehaviors',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceMarketingBeansUserBehaviorListDataBeanIBMAdminSummary,
			void
		>({
			path: `/store/${storeId}/user_behavior`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
