import { ContractResponse, ContractsResponse } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Contract<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags contract
	 * @name ContractDetail
	 * @summary Finds the contracts the current user is eligible to.
	 * @request GET:/store/{storeId}/contract
	 * @secure
	 * @response `200` `ContractsResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	contractDetail = (
		storeId: string,
		query: {
			/** the query name. */
			q: 'byPaymentTermConditionId' | 'eligible';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('contractDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'contractDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ContractsResponse, void>({
			path: `/store/${storeId}/contract`,
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
	 * @tags contract
	 * @name ContractDetail2
	 * @summary Finds the contracts the current user is eligible to.
	 * @request GET:/store/{storeId}/contract/{contractId}
	 * @originalName contractDetail
	 * @duplicate
	 * @secure
	 * @response `200` `ContractResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	contractDetail2 = (
		storeId: string,
		contractId: string,
		query?: {
			/** The currency code to use. */
			currency?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('contractDetail2'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'contractDetail2',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ContractResponse, void>({
			path: `/store/${storeId}/contract/${contractId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
