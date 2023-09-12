import {
	ComIbmCommerceContractBeansExtendedTermConditionDataBeanIBMStoreDetails,
	ComIbmCommerceToolsContractBeansDisplayCustomizationTCDataBeanIBMStoreDetails,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class TermCondition<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags term_condition
	 * @name TermConditionDetail
	 * @summary Finds the display customization TC of the account associated with the current user.
	 * @request GET:/store/{storeId}/term_condition
	 * @secure
	 * @response `200` `ComIbmCommerceToolsContractBeansDisplayCustomizationTCDataBeanIBMStoreDetails` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	termConditionDetail = (
		storeId: string,
		query: {
			/** The query name. Possible value is displayCustomizationTC. */
			q: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('termConditionDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'termConditionDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceToolsContractBeansDisplayCustomizationTCDataBeanIBMStoreDetails,
			void
		>({
			path: `/store/${storeId}/term_condition`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags term_condition
	 * @name TermConditionDetail2
	 * @summary Finds a term condition by its ID.
	 * @request GET:/store/{storeId}/term_condition/{termConditionId}
	 * @originalName termConditionDetail
	 * @duplicate
	 * @secure
	 * @response `200` `ComIbmCommerceContractBeansExtendedTermConditionDataBeanIBMStoreDetails` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	termConditionDetail2 = (storeId: string, termConditionId: string, params: RequestParams = {}) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('termConditionDetail2'))
		) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'termConditionDetail2',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceContractBeansExtendedTermConditionDataBeanIBMStoreDetails,
			void
		>({
			path: `/store/${storeId}/term_condition/${termConditionId}`,
			method: 'GET',
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
