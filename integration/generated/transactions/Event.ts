import {
	BehaviorRulesBehaviorRules,
	ComIbmCommerceRestMarketingHandlerEventHandlerEventTrigger,
	ComIbmCommerceRestMarketingHandlerEventHandlerEventTriggerClickinfo,
	ComIbmCommerceRestMarketingHandlerEventHandlerMarketingTrackingConsent,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Event<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Handles click information.
	 *
	 * @tags Event
	 * @name EventHandleClickInfo
	 * @summary Handle click information
	 * @request POST:/store/{storeId}/event/click_info
	 * @secure
	 * @response `202` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	eventHandleClickInfo = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestMarketingHandlerEventHandlerEventTriggerClickinfo,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('eventHandleClickInfo')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'eventHandleClickInfo',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/event/click_info`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: ContentType.Json,
			...params,
		});
	};
	/**
	 * @description Update the marketing tracking consent for a user for the store.
	 *
	 * @tags Event
	 * @name EventUpdateMarketingTrackingConsent
	 * @summary Update the marketing tracking consent for a user for the store.
	 * @request POST:/store/{storeId}/event/update_marketing_tracking_consent
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	eventUpdateMarketingTrackingConsent = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestMarketingHandlerEventHandlerMarketingTrackingConsent,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('eventUpdateMarketingTrackingConsent')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'eventUpdateMarketingTrackingConsent',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/event/update_marketing_tracking_consent`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: ContentType.Json,
			...params,
		});
	};
	/**
	 * @description Triggers marketing based on certain events.
	 *
	 * @tags Event
	 * @name EventTriggerMarketing
	 * @summary Trigger marketing by event
	 * @request POST:/store/{storeId}/event
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	eventTriggerMarketing = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestMarketingHandlerEventHandlerEventTrigger,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('eventTriggerMarketing')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'eventTriggerMarketing',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/event`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: ContentType.Json,
			...params,
		});
	};
	/**
	 * @description Gets user behavior rules.
	 *
	 * @tags Event
	 * @name EventGetBehaviorRules
	 * @summary Get user behavior rules
	 * @request GET:/store/{storeId}/event/behavior_rules
	 * @secure
	 * @response `200` `BehaviorRulesBehaviorRules` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	eventGetBehaviorRules = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('eventGetBehaviorRules')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'eventGetBehaviorRules',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<BehaviorRulesBehaviorRules, void>({
			path: `/store/${storeId}/event/behavior_rules`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Evaluates potential triggers passed from the store.
	 *
	 * @tags Event
	 * @name EventEvaluateTriggers
	 * @summary Evaluate triggers
	 * @request POST:/store/{storeId}/event/evaluate_triggers
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	eventEvaluateTriggers = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestMarketingHandlerEventHandlerEventTrigger,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('eventEvaluateTriggers')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'eventEvaluateTriggers',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/event/evaluate_triggers`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: ContentType.Json,
			...params,
		});
	};
}
