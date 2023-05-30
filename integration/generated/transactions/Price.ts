import {
	ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequests,
	PricePrice,
	PricePrices,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Price<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets the entitled and range prices for catalog entries by part numbers.
	 *
	 * @tags Price
	 * @name PriceByPartNumbers
	 * @summary Get prices by part numbers
	 * @request GET:/store/{storeId}/price
	 * @secure
	 * @response `200` `PricePrice` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	priceByPartNumbers = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byPartNumbers' | 'byCatalogEntryIds';
			/** The part number of the catalog entry. */
			partNumber: string[];
			/** The id of the catalog entry. */
			catalogEntryId: string[];
			/** The unique id of the contract. */
			contractId?: string;
			/** The currency of the price. */
			currency?:
				| 'JPY'
				| 'CNY'
				| 'BRL'
				| 'EUR'
				| 'RON'
				| 'RUB'
				| 'PLN'
				| 'USD'
				| 'KRW'
				| 'TWD'
				| 'CAD'
				| 'GBP';
			/** The quantity of the catalog entry. */
			quantity?: string;
			/** The unit of measurement of the quantity. */
			uom?: string;
			/** The date of the price. */
			date?: string;
			/** Whether to enable entitlement check when retrieving prices. */
			checkEntitlement?: 'true' | 'false';
			/** Whether ot treat dynamic kits as items when retrieving prices. */
			dynamicKitAsItem?: 'true' | 'false';
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: 'IBM_Store_EntitledPrice_All' | 'IBM_Store_EntitledPrice_RangePrice_All';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('priceByPartNumbers')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'priceByPartNumbers',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PricePrice, void>({
			path: `/store/${storeId}/price`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Finds prices in a store using a structure that allows multiple results in a single query.
	 *
	 * @tags Price
	 * @name PriceFindPricesByQuery
	 * @summary Get prices by query
	 * @request POST:/store/{storeId}/price
	 * @secure
	 * @response `200` `PricePrices` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	priceFindPricesByQuery = (
		storeId: string,
		data: ComIbmCommerceRestPriceHandlerPriceHandlerPriceRequests,
		query?: {
			/** The currency code to use for example, currency=USD. If no currency code is specified, the store default currency is used. This value is applied to all the queried products unless overridden at the product level. */
			currency?:
				| 'JPY'
				| 'CNY'
				| 'BRL'
				| 'EUR'
				| 'RON'
				| 'RUB'
				| 'PLN'
				| 'USD'
				| 'KRW'
				| 'TWD'
				| 'CAD'
				| 'GBP';
			/** Setting the 'profile' to 'default' or not specifying the 'profile' will result in normal prices being returned. A 'profile' value of 'range' will return the normal prices, and in addition, will return a list of range prices, which includes the minimum and maximum quantities as well as the price for each range. */
			profile?: 'default' | 'range';
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The catalog identifier. If none is specified, the store default catalog is used. */
			catalogId?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('priceFindPricesByQuery')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'priceFindPricesByQuery',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PricePrices, void>({
			path: `/store/${storeId}/price`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
}
