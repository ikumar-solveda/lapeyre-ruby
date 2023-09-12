import { FileUploadJobIBMStoreSummary } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class FileUploadJob<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags file_upload_job
	 * @name FileUploadJobDetail
	 * @summary Finds a file upload job by its ID.
	 * @request GET:/store/{storeId}/file_upload_job/{fileUploadJobId}
	 * @secure
	 * @response `200` `FileUploadJobIBMStoreSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	fileUploadJobDetail = (
		storeId: string,
		fileUploadJobId: string,
		query?: {
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The pageSize must be specified for paging to work. */
			pageNumber?: number;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The pageNumber must be specified for paging to work. */
			pageSize?: number;
			/** Language identifier. If not specified, the locale parameter will be used. If locale isnt specified, then the store default language shall be used. */
			langId?: string;
			/** The locale to use.If the langId parameter is specified, the locale parameter will be ignored. If no locale is specified, the store default locale will be used. */
			locale?: string;
			/** Name of the workspace to use for the request. */
			'workspace.name'?: string;
			/** Identifier of the workspace task to use for the request. */
			'workspace.task'?: string;
			/** Identifier of the workspace task group to use for the request. */
			'workspace.taskGroup'?: string;
			/** User identifier to act on behalf of. */
			forUserId?: string;
			/** User name to act on behalf of. */
			forUser?: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('fileUploadJobDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'fileUploadJobDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<FileUploadJobIBMStoreSummary, void>({
			path: `/store/${storeId}/file_upload_job/${fileUploadJobId}`,
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
	 * @tags file_upload_job
	 * @name FileUploadJobDetail2
	 * @summary Finds a file upload job by its ID.
	 * @request GET:/store/{storeId}/file_upload_job
	 * @originalName fileUploadJobDetail
	 * @duplicate
	 * @secure
	 * @response `200` `FileUploadJobIBMStoreSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	fileUploadJobDetail2 = (
		storeId: string,
		query: {
			/** The query name. */
			q: string;
			/** Returns the file upload jobs loaded later than the specified number days from current date */
			numberOfDays: string;
			/** Returns the file upload jobs of the specified upload type, for example, RequisitionListUpload */
			uploadType: string;
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The pageSize must be specified for paging to work. */
			pageNumber?: number;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The pageNumber must be specified for paging to work. */
			pageSize?: number;
			/** Language identifier. If not specified, the locale parameter will be used. If locale isnt specified, then the store default language shall be used. */
			langId?: string;
			/** The locale to use.If the langId parameter is specified, the locale parameter will be ignored. If no locale is specified, the store default locale will be used. */
			locale?: string;
			/** Name of the workspace to use for the request. */
			'workspace.name'?: string;
			/** Identifier of the workspace task to use for the request. */
			'workspace.task'?: string;
			/** Identifier of the workspace task group to use for the request */
			'workspace.taskGroup'?: string;
			/** User identifier to act on behalf of. */
			forUserId?: string;
			/** User name to act on behalf of. */
			forUser?: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('fileUploadJobDetail2'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'fileUploadJobDetail2',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<FileUploadJobIBMStoreSummary, void>({
			path: `/store/${storeId}/file_upload_job`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
