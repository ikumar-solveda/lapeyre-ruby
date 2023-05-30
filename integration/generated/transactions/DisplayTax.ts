import { DisplayTaxCollection } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class DisplayTax<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Display Tax
	 * @name GetTaxes
	 * @summary Get tax amount and tax rate for catalog entry
	 * @request GET:/store/{storeId}/display_tax
	 * @secure
	 * @response `200` `DisplayTaxCollection` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	getTaxes = (
		storeId: string,
		query: {
			/** A comma separated string of catlog entry unique identifiers. e.g. "12345,23456" */
			catalogEntryId: string;
			/** A comma separated string of prices that matches "catEntryId". e.g. "100.50,80.50" */
			price: string;
			/** The curency. e.g. USD */
			currency: string;
			/** The quantity of the product. Optional, will default to 1 if not set. */
			quantity?: number;
			/** The ID of the address will be shipped to. */
			addressId?: string;
			/** The fufillment center will be shipped from. */
			fufillmentCenterId?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('getTaxes')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'getTaxes',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<DisplayTaxCollection, void>({
			path: `/store/${storeId}/display_tax`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
