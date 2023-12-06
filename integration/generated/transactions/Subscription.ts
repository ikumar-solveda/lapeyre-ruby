import {
	ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerCancelRecurringOrSubscription,
	ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription,
	ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscriptionResponse,
	SubscriptionIBMStoreDetails,
	SubscriptionIBMStoreSummary,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Subscription<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Submits a recurring or subscription order.
	 *
	 * @tags Subscription
	 * @name SubscriptionSubmitRecurringOrSubscription
	 * @summary Submit recurring or subscription
	 * @request POST:/store/{storeId}/subscription/{orderId}/submit_recurring_or_subscription
	 * @secure
	 * @response `200` `ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscriptionResponse` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	subscriptionSubmitRecurringOrSubscription = (
		storeId: string,
		orderId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails ||
				this.traceDetails.includes('subscriptionSubmitRecurringOrSubscription'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'subscriptionSubmitRecurringOrSubscription',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscriptionResponse,
			void
		>({
			path: `/store/${storeId}/subscription/${orderId}/submit_recurring_or_subscription`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets subscriptions by user and subscription type.
	 *
	 * @tags Subscription
	 * @name SubscriptionByBuyerIdAndSubscriptionType
	 * @summary Get by user and subscription type
	 * @request GET:/store/{storeId}/subscription
	 * @secure
	 * @response `200` `SubscriptionIBMStoreSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	subscriptionByBuyerIdAndSubscriptionType = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byBuyerIdAndSubscriptionType' | 'bySubscriptionIds';
			/** The subscription type code for example, All, RecurringOrder. */
			subscriptionTypeCode: string;
			/** The subscription Id. */
			subscriptionId: string;
			/** The buyer ID. */
			buyerId: string;
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: 'IBM_Store_Summary';
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('subscriptionByBuyerIdAndSubscriptionType'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'subscriptionByBuyerIdAndSubscriptionType',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<SubscriptionIBMStoreSummary, void>({
			path: `/store/${storeId}/subscription`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets subscription information by subscription ID.
	 *
	 * @tags Subscription
	 * @name SubscriptionBySubscriptionId
	 * @summary Get by subscription ID
	 * @request GET:/store/{storeId}/subscription/{subscriptionId}
	 * @secure
	 * @response `200` `SubscriptionIBMStoreDetails` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	subscriptionBySubscriptionId = (
		storeId: string,
		subscriptionId: string,
		query?: {
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: 'IBM_Admin_Summary';
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('subscriptionBySubscriptionId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'subscriptionBySubscriptionId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<SubscriptionIBMStoreDetails, void>({
			path: `/store/${storeId}/subscription/${subscriptionId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Cancels the specified recurring or subscription order.
	 *
	 * @tags Subscription
	 * @name SubscriptionCancelRecurringOrSubscription
	 * @summary Cancel recurring or subscription
	 * @request DELETE:/store/{storeId}/subscription/{orderId}/cancel_recurring_or_subscription
	 * @secure
	 * @response `200` `ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerCancelRecurringOrSubscription` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	subscriptionCancelRecurringOrSubscription = (
		storeId: string,
		orderId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The subscription ID. */
			subscriptionId?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails ||
				this.traceDetails.includes('subscriptionCancelRecurringOrSubscription'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'subscriptionCancelRecurringOrSubscription',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerCancelRecurringOrSubscription,
			void
		>({
			path: `/store/${storeId}/subscription/${orderId}/cancel_recurring_or_subscription`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
