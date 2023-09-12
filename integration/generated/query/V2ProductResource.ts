import { ProductDetail } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class V2ProductResource<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags V2-Product-Resource
	 * @name FindProducts
	 * @summary Gets Products
	 * @request GET:/api/v2/products
	 * @response `200` `ProductDetail` The request is completed successfully.
	 * @response `400` `string` Bad request. Some of the inputs provided to the request are not valid.
	 * @response `404` `string` The specified resource could not be found.
	 * @response `500` `string` Internal server error. Additional details will be contained on the server logs.
	 */
	findProducts = (
		query: {
			storeId: string;
			categoryId?: string;
			searchTerm?: string;
			id?: string[];
			productId?: string;
			partNumber?: string[];
			/** @format int32 */
			limit?: number;
			/** @format int32 */
			offset?: number;
			/** The type of the merchandising association to be returned. */
			associationType?: string;
			/** The attribute associated keywords to be returned. */
			attributeKeyword?: string;
			/** The catalog identifier. If none is specified, the store default catalog will be used. */
			catalogId?: string;
			/** The contractId */
			contractId?: string;
			/** The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency will be used. */
			currency?: string;
			/** Language identifier. If not specified, the "locale" parameter will be used. If "locale" is not specified, then the store default language will be used. */
			langId?: string;
			/** Option to force an entitlement check. */
			checkEntitlement?: boolean;
			/** The attachment filter. */
			attachmentFilter?: string;
			/** Profile name. Profiles determine the subset of data to be returned by a search query. */
			profileName?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (loggerCan('trace') && (!this.traceDetails || this.traceDetails.includes('findProducts'))) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findProducts',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ProductDetail, string>({
			path: `/api/v2/products`,
			method: 'GET',
			query: query,
			format: params.format ?? 'json',
			...params,
		});
	};
}
