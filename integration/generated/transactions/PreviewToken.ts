import {
	ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPasswordValidRequest,
	ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewParameters,
	ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewToken,
	ComIbmCommerceRestMemberHandlerPreviewTokenHandlerValidIdentifier,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class PreviewToken<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Checks if the password is valid.
	 *
	 * @tags Preview Token
	 * @name CheckIsPasswordValid
	 * @summary Check password validity
	 * @request POST:/store/{storeId}/previewToken/isvalid
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerPreviewTokenHandlerValidIdentifier` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	checkIsPasswordValid = (
		storeId: string,
		data: ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPasswordValidRequest,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('checkIsPasswordValid')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: data ?? {},
				methodName: 'checkIsPasswordValid',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerPreviewTokenHandlerValidIdentifier,
			void
		>({
			path: `/store/${storeId}/previewToken/isvalid`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Requests the preview token.
	 *
	 * @tags Preview Token
	 * @name GeneratePreviewToken
	 * @summary Requests the preview token.
	 * @request POST:/store/{storeId}/previewToken
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewToken` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	generatePreviewToken = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewParameters,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('generatePreviewToken')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'generatePreviewToken',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewToken, void>({
			path: `/store/${storeId}/previewToken`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
}
