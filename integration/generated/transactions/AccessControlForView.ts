import { AccesscontrolByUserIdAndViewId } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class AccessControlForView<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags access_control_for_view
	 * @name AccessControlByUserIdAndViewIdDetail
	 * @summary By default, this API check if this user is allowed to access this view.
	 * @request GET:/store/{storeId}/access_control/byUserIdAndViewId
	 * @secure
	 * @response `200` `AccesscontrolByUserIdAndViewId` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	accessControlByUserIdAndViewIdDetail = (
		storeId: string,
		query: {
			/** The view identifier. */
			viewId: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isnt specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isnt specified as well, the default response format shall be in json */
			responseFormat?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('accessControlByUserIdAndViewIdDetail')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'accessControlByUserIdAndViewIdDetail',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<AccesscontrolByUserIdAndViewId, void>({
			path: `/store/${storeId}/access_control/byUserIdAndViewId`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
