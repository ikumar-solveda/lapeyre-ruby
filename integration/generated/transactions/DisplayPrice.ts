import { DisplayPriceIBMStoreDisplayPrice } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class DisplayPrice<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets display prices for catalog entries by part numbers and price rule ID.
	 *
	 * @tags Display Price
	 * @name DisplayPriceByPartNumbersAndPriceRuleId
	 * @summary Get by part number and price rule ID
	 * @request GET:/store/{storeId}/display_price
	 * @secure
	 * @response `200` `DisplayPriceIBMStoreDisplayPrice` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	displayPriceByPartNumbersAndPriceRuleId = (
		storeId: string,
		query: {
			/** The query name. */
			q:
				| 'byPartNumbersAndPriceRuleId'
				| 'byCatalogEntryIdsAndPriceRuleName'
				| 'byPartNumbersAndPriceRuleName'
				| 'byCatalogEntryIdsAndPriceRuleId';
			/** The unique id of catalog entry. */
			partNumber: string[];
			/** The unique id of price rule. */
			priceRuleId: string;
			/** The unique id of catalog entry. */
			catalogEntryId: string[];
			/** The name of price rule. */
			priceRuleName: string;
			/** The currency of the price. */
			currency?: string;
			/** The quantity of the catalog entry. */
			quantity?: string;
			/** The unit of measurement of the quantity. */
			uom?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('displayPriceByPartNumbersAndPriceRuleId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'displayPriceByPartNumbersAndPriceRuleId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<DisplayPriceIBMStoreDisplayPrice, void>({
			path: `/store/${storeId}/display_price`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
