import { SellerCollection } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class MarketplaceSeller<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Get active marketplace sellers for a store.
	 *
	 * @tags Marketplace Seller
	 * @name FindActiveMarketplaceSellerByStoreId
	 * @summary Get active marketplace sellers for a store.
	 * @request GET:/store/{storeId}/marketplace-sellers
	 * @secure
	 * @response `200` `SellerCollection` The sellers with status details are retrieved successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	findActiveMarketplaceSellerByStoreId = (
		storeId: string,
		query?: {
			/** The return language for marketplace seller name and description. The store default language is used if missing. */
			langId?: string;
			/**
			 * The position within the resulting dataset where the query begins returning item records. If the offset is "5", the records that returned begin with the sixth record that matches the query parameters. If the offset is "0", the records that are returned begin with the first record that matches the query parameters.
			 * @format int32
			 */
			offset?: number;
			/**
			 * The maximum number of records to return.
			 * @format int32
			 */
			limit?: number;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('findActiveMarketplaceSellerByStoreId')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'findActiveMarketplaceSellerByStoreId',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<SellerCollection, void>({
			path: `/store/${storeId}/marketplace-sellers`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
