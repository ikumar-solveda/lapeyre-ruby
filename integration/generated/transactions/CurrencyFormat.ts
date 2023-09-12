import { StoreCurrencyFormatDescriptionResponse } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class CurrencyFormat<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets currency format by currency.
	 *
	 * @tags Currency Format
	 * @name CurrencyFormatFindByCurrency
	 * @summary Get currency format
	 * @request GET:/store/{storeId}/currency_format
	 * @secure
	 * @response `200` `StoreCurrencyFormatDescriptionResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	currencyFormatFindByCurrency = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byCurrency';
			/** The query name. */
			currency?: string;
			/** The number usage. */
			numberUsage?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('currencyFormatFindByCurrency'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'currencyFormatFindByCurrency',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<StoreCurrencyFormatDescriptionResponse, void>({
			path: `/store/${storeId}/currency_format`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
