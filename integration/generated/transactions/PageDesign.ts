import { PageDesignIBMStoreDetails } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class PageDesign<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Finds a product display layout page by product ID.
	 *
	 * @tags Page Design
	 * @name PageDesignByProductId
	 * @summary Get layout by product ID
	 * @request GET:/store/{storeId}/page_design
	 * @secure
	 * @response `200` `PageDesignIBMStoreDetails` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	pageDesignByProductId = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byObjectIdentifier' | 'byLayoutId' | 'byProductId' | 'byLayoutActivityId';
			/** The product ID. */
			productId: string;
			/** The layout activity ID. */
			layoutActivityId: string;
			/** The layout ID. */
			layoutId: string;
			/** The pageGroup. */
			pageGroup: string;
			/** The deviceClass. */
			deviceClass: string;
			/** The object identifier */
			objectIdentifier: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('pageDesignByProductId')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'pageDesignByProductId',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PageDesignIBMStoreDetails, void>({
			path: `/store/${storeId}/page_design`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
