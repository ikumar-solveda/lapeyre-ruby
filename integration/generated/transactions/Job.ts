import {
	ComIbmCommerceRestSchedulerHandlerJobHandlerCreateJobRequest,
	ComIbmCommerceRestSchedulerHandlerJobHandlerCreateJobResponse,
	ComIbmCommerceSchedulerBeansJobDataBeanIBMAdminSummary,
	ComIbmCommerceSchedulerBeansJobStatusListDataBeanIBMAdminSummary,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Job<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags job
	 * @name PostJob
	 * @summary createJob.
	 * @request POST:/store/{storeId}/job
	 * @secure
	 * @response `200` `ComIbmCommerceRestSchedulerHandlerJobHandlerCreateJobResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	postJob = (
		storeId: string,
		data?: ComIbmCommerceRestSchedulerHandlerJobHandlerCreateJobRequest,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('postJob')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: data ?? {},
				methodName: 'postJob',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceRestSchedulerHandlerJobHandlerCreateJobResponse, void>({
			path: `/store/${storeId}/job`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags job
	 * @name GetJob
	 * @summary findJobById.
	 * @request GET:/store/{storeId}/job/{jobId}
	 * @secure
	 * @response `200` `ComIbmCommerceSchedulerBeansJobDataBeanIBMAdminSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	getJob = (storeId: string, jobId: string, params: RequestParams = {}) => {
		if (!this.traceDetails || this.traceDetails.includes('getJob')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'getJob',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceSchedulerBeansJobDataBeanIBMAdminSummary, void>({
			path: `/store/${storeId}/job/${jobId}`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags job
	 * @name JobStatusDetail
	 * @summary findJobStatuses.
	 * @request GET:/store/{storeId}/job_status
	 * @secure
	 * @response `200` `ComIbmCommerceSchedulerBeansJobStatusListDataBeanIBMAdminSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	jobStatusDetail = (
		storeId: string,
		query?: {
			/** jobId */
			jobId?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('jobStatusDetail')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'jobStatusDetail',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceSchedulerBeansJobStatusListDataBeanIBMAdminSummary,
			void
		>({
			path: `/store/${storeId}/job_status`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
