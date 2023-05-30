import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class OrderDownload<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Order Download
	 * @name OrderDownloadByExportIdDetail
	 * @summary Download an order export file by export ID.
	 * @request GET:/store/{storeId}/order_download/byExportId/{exportId}
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `404` `void` The specified resource couldn't be found.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	orderDownloadByExportIdDetail = (
		storeId: string,
		exportId: string,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('orderDownloadByExportIdDetail')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'orderDownloadByExportIdDetail',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/order_download/byExportId/${exportId}`,
			method: 'GET',
			secure: true,
			...params,
		});
	};
}
