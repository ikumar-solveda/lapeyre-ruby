import { PromotionPromotion } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Promotion<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets promotions by ID.
	 *
	 * @tags Promotion
	 * @name PromotionGetPromotionById
	 * @summary Get promotion list by ID
	 * @request GET:/store/{storeId}/promotion/{promotionId}
	 * @secure
	 * @response `200` `PromotionPromotion` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	promotionGetPromotionById = (
		storeId: string,
		promotionId: number,
		query?: {
			/**
			 * Language identifier. If not specified, the "locale" parameter is used. If "locale" is not specified, then the store default language is used.
			 * @example -1
			 */
			langId?: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/**
			 * The currency code to use for example, currency=USD. If no currency code is specified, the store default currency is used.
			 * @example  USD
			 */
			currency?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('promotionGetPromotionById'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'promotionGetPromotionById',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PromotionPromotion, void>({
			path: `/store/${storeId}/promotion/${promotionId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets the promotion list by query type and parameters.
	 *
	 * @tags Promotion
	 * @name PromotionGetPromotionsByQuery
	 * @summary Get promotion list by query
	 * @request GET:/store/{storeId}/promotion
	 * @secure
	 * @response `200` `PromotionPromotion` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	promotionGetPromotionsByQuery = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'all' | 'byName';
			/**
			 * Language identifier. If not specified, the "locale" parameter is used. If "locale" is not specified, then the store default language is used.
			 * @example -1
			 */
			langId?: string;
			/** The name of the promotion to find when finding promotions by name. */
			qName?: string;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
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
			/**
			 * The currency code to use for example, currency=USD. If no currency code is specified, the store default currency is used.
			 * @example JPY, CNY, BRL, EUR, RON, RUB, PLN, USD, KRW, CAD
			 */
			currency?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('promotionGetPromotionsByQuery'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'promotionGetPromotionsByQuery',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<PromotionPromotion, void>({
			path: `/store/${storeId}/promotion`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
