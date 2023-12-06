import {
	ComIbmCommerceMemberFacadeServerCommandsUserRegistrationEmailActivateResendCmd,
	ComIbmCommerceRestMemberHandlerUserActivateHandlerActiveUserRequestBody,
	ComIbmCommerceRestMemberHandlerUserActivateHandlerActiveUserResponse,
	ComIbmCommerceRestMemberHandlerUserActivateHandlerResendActiveUserRequestBody,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class UserActivate<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Activate the user account.
	 *
	 * @tags User Activate
	 * @name UserActivateActiveUser
	 * @summary Activate the user account.
	 * @request PUT:/store/{storeId}/useractivate/emailactivate
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerUserActivateHandlerActiveUserResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	userActivateActiveUser = (
		storeId: string,
		data: ComIbmCommerceRestMemberHandlerUserActivateHandlerActiveUserRequestBody,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The language ID. */
			langId?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('userActivateActiveUser'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'userActivateActiveUser',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerUserActivateHandlerActiveUserResponse,
			void
		>({
			path: `/store/${storeId}/useractivate/emailactivate`,
			method: 'PUT',
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
	 * @description Resend user account activation email.
	 *
	 * @tags User Activate
	 * @name UserActivateResendActiveUser
	 * @summary Resend user account activation email.
	 * @request POST:/store/{storeId}/useractivate/resendemail
	 * @secure
	 * @response `201` `ComIbmCommerceMemberFacadeServerCommandsUserRegistrationEmailActivateResendCmd` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	userActivateResendActiveUser = (
		storeId: string,
		data: ComIbmCommerceRestMemberHandlerUserActivateHandlerResendActiveUserRequestBody,
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
			(!this.traceDetails || this.traceDetails.includes('userActivateResendActiveUser'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'userActivateResendActiveUser',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceMemberFacadeServerCommandsUserRegistrationEmailActivateResendCmd,
			void
		>({
			path: `/store/${storeId}/useractivate/resendemail`,
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
}
