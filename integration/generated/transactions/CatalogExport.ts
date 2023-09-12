import {
	ComIbmCommerceRestCatalogHandlerCatalogExportHandlerCatalogExportRequest,
	ComIbmCommerceRestCatalogHandlerCatalogExportHandlerCatalogExportResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class CatalogExport<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Catalog Export
	 * @name ExportCatalogForObjectType
	 * @summary Exports all categories or all products for a store.
	 * @request POST:/store/{storeId}/catalog_export/{objectType}
	 * @secure
	 * @response `200` `ComIbmCommerceRestCatalogHandlerCatalogExportHandlerCatalogExportResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `404` `void` The specified resource couldn't be found.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	exportCatalogForObjectType = (
		storeId: string,
		objectType: string,
		data?: ComIbmCommerceRestCatalogHandlerCatalogExportHandlerCatalogExportRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('exportCatalogForObjectType'))
		) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: data ?? {},
				methodName: 'exportCatalogForObjectType',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestCatalogHandlerCatalogExportHandlerCatalogExportResponse,
			void
		>({
			path: `/store/${storeId}/catalog_export/${objectType}`,
			method: 'POST',
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			...params,
		});
	};
}
