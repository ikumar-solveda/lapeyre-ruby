import {
	ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm,
	ComIbmCommerceRestMemberHandlerLoginIdentityHandlerOAuthUserIdentity,
	ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm,
	ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class LoginIdentity<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description This API supports the following operations: <br> <br> 1. Logs in a registered user using their user name (logonId) and password. The following input parameters are required in the request body: <br> logonId 					: logonId of the registered user<br> logonPassword 		: Current password of the registered user <br><br> This API returns the following error when the password has expired and must be updated: <br> Error Code 					: 2170 <br> Error Message 		: The current password has expired. A new password must be specified. <br> <br> 2. Logs in a registered user while updating their expired password.  The following input parameters are required in the request body: <br> logonId 					: logonId of the registered user<br> logonPassword 		: Current password of the registered user <br> logonPasswordNew 				: New password of the user <br> logonPasswordVerify 	: The verified new password of the user, which must be identical to logonPasswordNew
	 *
	 * @tags Login Identity
	 * @name LoginIdentityLogin
	 * @summary Log in user using logonId and password
	 * @request POST:/store/{storeId}/loginidentity
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	loginIdentityLogin = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('loginIdentityLogin'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'loginIdentityLogin',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity, void>(
			{
				path: `/store/${storeId}/loginidentity`,
				method: 'POST',
				query: query,
				body: data,
				secure: true,
				type: params.type ?? ContentType.Json,
				format: params.format ?? 'json',
				storeId,
				...params,
			}
		);
	};
	/**
	 * @description Generate access token based on authorization code passed or validate the passed access token. Validate the user details and create a new user if not registered.
	 *
	 * @tags Login Identity
	 * @name LoginidentityOauthValidateCreate
	 * @summary Generate or validate access token with external authorization based on OAuth2.0.
	 * @request POST:/store/{storeId}/loginidentity/oauth_validate
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerLoginIdentityHandlerOAuthUserIdentity` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	loginidentityOauthValidateCreate = (
		storeId: string,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in \"responseFormat\". Valid values include \"json\" and \"xml\" without the quotes. If the responseFormat. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('loginidentityOauthValidateCreate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'loginidentityOauthValidateCreate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerLoginIdentityHandlerOAuthUserIdentity,
			void
		>({
			path: `/store/${storeId}/loginidentity/oauth_validate`,
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
	 * @description Logs out the registered user.
	 *
	 * @tags Login Identity
	 * @name LoginIdentityLogout
	 * @summary Log out user
	 * @request DELETE:/store/{storeId}/loginidentity/@self
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	loginIdentityLogout = (
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
			(!this.traceDetails || this.traceDetails.includes('loginIdentityLogout'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'loginIdentityLogout',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/loginidentity/@self`,
			method: 'DELETE',
			query: query,
			secure: true,
			storeId,
			...params,
		});
	};
}
