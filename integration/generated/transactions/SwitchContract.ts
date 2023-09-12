import {
	ComHclCommerceRestMemberHandlerSwitchContractRequest,
	ComHclCommerceRestMemberHandlerSwitchContractResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class SwitchContract<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Switch Contract
	 * @name SwitchContractSwitchToUpdate
	 * @summary Response the contract change action.
	 * @request PUT:/store/{storeId}/switchContract/switchTo
	 * @secure
	 * @response `200` `ComHclCommerceRestMemberHandlerSwitchContractResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	switchContractSwitchToUpdate = (
		storeId: string,
		query?: {
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		data?: ComHclCommerceRestMemberHandlerSwitchContractRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('switchContractSwitchToUpdate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'switchContractSwitchToUpdate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComHclCommerceRestMemberHandlerSwitchContractResponse, void>({
			path: `/store/${storeId}/switchContract/switchTo`,
			method: 'PUT',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			...params,
		});
	};
}
