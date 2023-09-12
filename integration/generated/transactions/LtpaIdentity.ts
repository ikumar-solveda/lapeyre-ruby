import {
	ComIbmCommerceRestMemberHandlerLTPAIdentityHandlerLTPAIdentityForm,
	ComIbmCommerceRestMemberHandlerLTPAIdentityHandlerUserIdentity,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class LtpaIdentity<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags LTPA Identity
	 * @name LtpaidentitySelfDelete
	 * @summary Logs out the user.
	 * @request DELETE:/store/{storeId}/ltpaidentity/@self
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	ltpaidentitySelfDelete = (
		storeId: string,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('ltpaidentitySelfDelete'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'ltpaidentitySelfDelete',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/ltpaidentity/@self`,
			method: 'DELETE',
			query: query,
			secure: true,
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags LTPA Identity
	 * @name LtpaidentityCreate
	 * @summary Authenticates a user using an LTPA token.
	 * @request POST:/store/{storeId}/ltpaidentity
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerLTPAIdentityHandlerUserIdentity` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	ltpaidentityCreate = (
		storeId: string,
		data: ComIbmCommerceRestMemberHandlerLTPAIdentityHandlerLTPAIdentityForm,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('ltpaidentityCreate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'ltpaidentityCreate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestMemberHandlerLTPAIdentityHandlerUserIdentity, void>({
			path: `/store/${storeId}/ltpaidentity`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			...params,
		});
	};
}
