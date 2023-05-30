import { FlowFlow } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Flow<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets the flow info by flow ID.
	 *
	 * @tags Flow
	 * @name FlowFindByFlowId
	 * @summary Get flow information by ID
	 * @request GET:/store/{storeId}/flow/{flowId}
	 * @secure
	 * @response `200` `FlowFlow` The requested completed successfully.
	 */
	flowFindByFlowId = (storeId: string, flowId: string, params: RequestParams = {}) => {
		if (!this.traceDetails || this.traceDetails.includes('flowFindByFlowId')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'flowFindByFlowId',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<FlowFlow, any>({
			path: `/store/${storeId}/flow/${flowId}`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	};
}
