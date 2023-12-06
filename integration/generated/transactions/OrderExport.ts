import {
	ComIbmCommerceRestOrderHandlerOrderExportHandlerOrderExportRequest,
	ComIbmCommerceRestOrderHandlerOrderExportHandlerOrderExportResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class OrderExport<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Order Export
	 * @name ExportOrders
	 * @summary Exports orders for a store.
	 * @request POST:/store/{storeId}/order_export
	 * @secure
	 * @response `200` `ComIbmCommerceRestOrderHandlerOrderExportHandlerOrderExportResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `404` `void` The specified resource couldn't be found.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	exportOrders = (
		storeId: string,
		data?: ComIbmCommerceRestOrderHandlerOrderExportHandlerOrderExportRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (loggerCan('trace') && (!this.traceDetails || this.traceDetails.includes('exportOrders'))) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: data ?? {},
				methodName: 'exportOrders',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestOrderHandlerOrderExportHandlerOrderExportResponse,
			void
		>({
			path: `/store/${storeId}/order_export`,
			method: 'POST',
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
