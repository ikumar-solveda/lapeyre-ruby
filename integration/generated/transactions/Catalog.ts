import { CatalogIBMAdminDetails } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Catalog<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Catalog
	 * @name FindByStoreId
	 * @summary Get all the catalogs of a store by store id.
	 * @request GET:/store/{storeId}/catalog
	 * @secure
	 * @response `200` `CatalogIBMAdminDetails` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	findByStoreId = (
		storeId: string,
		query?: {
			/**
			 * Language identifier. If not specified, the "locale" parameter will be used. If "locale" isn't specified, then the store default language shall be used.
			 * @example -1
			 */
			langId?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a query. */
			profileName?: 'IBM_Admin_Summary' | 'IBM_Admin_Details';
			/**
			 * Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
			 * @format int32
			 */
			pageNumber?: number;
			/**
			 * Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
			 * @format int32
			 */
			pageSize?: number;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (loggerCan('trace') && (!this.traceDetails || this.traceDetails.includes('findByStoreId'))) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findByStoreId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CatalogIBMAdminDetails, void>({
			path: `/store/${storeId}/catalog`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
