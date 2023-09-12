import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class CatalogDownload<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Catalog Download
	 * @name DownloadByExportId
	 * @summary Download a catalog export file by export ID.
	 * @request GET:/store/{storeId}/catalog_download/byExportId/{exportId}
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `404` `void` The specified resource couldn't be found.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	downloadByExportId = (
		storeId: string,
		exportId: string,
		query?: {
			/** The optional deleted flag. The value can be true or false. The default is false if it is not specified. If it is true, the file downloaded will only contains the deleted objects since last export. */
			deleted?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('downloadByExportId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'downloadByExportId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/catalog_download/byExportId/${exportId}`,
			method: 'GET',
			query: query,
			secure: true,
			...params,
		});
	};
}
