import {
	ComIbmCommerceRestMemberHandlerUserContextHandlerPersonalizationIdentifier,
	ComIbmCommerceRestMemberHandlerUserContextHandlerUserContext,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class UserContext<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets or generates the Personalization ID of the current session.
	 *
	 * @tags User Context
	 * @name UserContextGetPersonalizationId
	 * @summary Get personalization ID
	 * @request GET:/store/{storeId}/usercontext/personalizationId
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerUserContextHandlerPersonalizationIdentifier` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	userContextGetPersonalizationId = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('userContextGetPersonalizationId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'userContextGetPersonalizationId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerUserContextHandlerPersonalizationIdentifier,
			void
		>({
			path: `/store/${storeId}/usercontext/personalizationId`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Gets the context data by the cookies and tokens sent with the request.
	 *
	 * @tags User Context
	 * @name UserContextGetContextData
	 * @summary Get context data from request
	 * @request GET:/store/{storeId}/usercontext/@self/contextdata
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerUserContextHandlerUserContext` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	userContextGetContextData = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('userContextGetContextData'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'userContextGetContextData',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestMemberHandlerUserContextHandlerUserContext, void>({
			path: `/store/${storeId}/usercontext/@self/contextdata`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
