import { CategoryIBMAdminDetailsBreadcrumb } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Category<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets catalogs by search term.
	 *
	 * @tags Category
	 * @name CategoryFindBySearchTerm
	 * @summary Get catalogs by search term
	 * @request GET:/store/{storeId}/category/bySearchTerm/{searchTerm}
	 * @secure
	 * @response `200` `CategoryIBMAdminDetailsBreadcrumb` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	categoryFindBySearchTerm = (
		storeId: string,
		searchTerm: string,
		query?: {
			/** Language identifier. If not specified, the "locale" parameter is used. If "locale" is not specified, then the store default language is used. */
			langId?: string;
			/** The unique ID of the catalog to search the categories under. */
			catalogId?: string;
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?:
				| 'IBM_Admin_Summary'
				| 'IBM_Admin_Details'
				| 'IBM_Admin_Summary_Breadcrumb'
				| 'IBM_Admin_Details_Breadcrumb';
			/**
			 * Page number. Valid values are positive integers starting at 1. Use pageNumber with pageSize.
			 * @format int32
			 */
			pageNumber?: number;
			/**
			 * Page size. Used to limit the amount of data returned by a query. Valid values are integers starting with 1. Use pageSize with pageNumber.
			 * @format int32
			 */
			pageSize?: number;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('categoryFindBySearchTerm'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'categoryFindBySearchTerm',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CategoryIBMAdminDetailsBreadcrumb, void>({
			path: `/store/${storeId}/category/bySearchTerm/${searchTerm}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
