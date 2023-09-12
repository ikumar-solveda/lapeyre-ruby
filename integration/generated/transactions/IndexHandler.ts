import { DataImportStatusResponse } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class IndexHandler<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
 * No description
 *
 * @tags IndexHandler
 * @name IndexDataImportBuildCreate
 * @request POST:/admin/index/dataImport/build
 * @secure
 * @response `200` `{
  jobStatusId?: string,

}` The requested completed successfully.
 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
 * @response `401` `void` Not authenticated. The user session is not valid.
 * @response `403` `void` The user is not authorized to perform the specified request.
 * @response `404` `void` The specified resource could not be found.
 * @response `500` `void` Internal server error. For details, see the server log files.
 */
	indexDataImportBuildCreate = (
		query?: {
			masterCatalogId?: string;
			fullBuild?: string;
			indexType?: string;
			indexSubType?: string;
			localeName?: string;
			validateIndex?: boolean;
			runCategoryRules?: boolean;
			storeId?: string;
			catentryId?: string;
			contractId?: string;
			currency?: string;
			numWorkers?: string;
			flushSize?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('indexDataImportBuildCreate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'indexDataImportBuildCreate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			{
				jobStatusId?: string;
			},
			void
		>({
			path: `/admin/index/dataImport/build`,
			method: 'POST',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags IndexHandler
	 * @name IndexDataImportStatusList
	 * @request GET:/admin/index/dataImport/status
	 * @secure
	 * @response `200` `DataImportStatusResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	indexDataImportStatusList = (
		query?: {
			jobStatusId?: string;
			detailInfo?: string;
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('indexDataImportStatusList'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'indexDataImportStatusList',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<DataImportStatusResponse, void>({
			path: `/admin/index/dataImport/status`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
