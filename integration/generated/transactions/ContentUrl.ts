import { ContentUrlResponse } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class ContentUrl<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags contentUrl
	 * @name ContentUrlDetail
	 * @summary Response the content url resolved values
	 * @request GET:/store/{storeId}/contentUrl
	 * @secure
	 * @response `200` `ContentUrlResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	contentUrlDetail = (
		storeId: string,
		query: {
			/** The preview. */
			preview: string;
			/** The includeHostName. */
			includeHostName: string;
			/** The unresolvedURL. */
			unresolvedURL: string;
			/** The storeStaticAssets. */
			storeStaticAssets: string;
			/** The useCustomerTenantWCH. */
			useCustomerTenantWCH: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isnt specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isnt specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('contentUrlDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'contentUrlDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ContentUrlResponse, void>({
			path: `/store/${storeId}/contentUrl`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
