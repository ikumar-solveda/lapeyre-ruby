import {
	ComIbmCommerceRestMemberHandlerGuestIdentityHandlerGuestIdentityForm,
	ComIbmCommerceRestMemberHandlerGuestIdentityHandlerUserIdentity,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class GuestIdentity<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Creates identity tokens for a guest user.
	 *
	 * @tags Guest Identity
	 * @name GuestIdentityLogin
	 * @summary Create identity token
	 * @request POST:/store/{storeId}/guestidentity
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerGuestIdentityHandlerUserIdentity` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	guestIdentityLogin = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestMemberHandlerGuestIdentityHandlerGuestIdentityForm,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('guestIdentityLogin')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'guestIdentityLogin',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestMemberHandlerGuestIdentityHandlerUserIdentity, void>(
			{
				path: `/store/${storeId}/guestidentity`,
				method: 'POST',
				query: query,
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}
		);
	};
	/**
	 * @description Logs out a guest user.
	 *
	 * @tags Guest Identity
	 * @name GuestIdentityLogout
	 * @summary Log off guest user
	 * @request DELETE:/store/{storeId}/guestidentity/@self
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	guestIdentityLogout = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('guestIdentityLogout')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'guestIdentityLogout',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/guestidentity/@self`,
			method: 'DELETE',
			query: query,
			secure: true,
			...params,
		});
	};
}
