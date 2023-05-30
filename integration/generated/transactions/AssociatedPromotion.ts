import { ComIbmCommerceFulfillmentBeansCalculationCodeListDataBeanIBMAssociatedPromotionsListSummary } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class AssociatedPromotion<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets promotions list by product ID.
	 *
	 * @tags Associated Promotion
	 * @name AssociatedPromotionFindPromotionsByProductWAssociatedPromotionSummaryProfileName
	 * @summary Get promotion list
	 * @request GET:/store/{storeId}/associated_promotion
	 * @secure
	 * @response `200` `ComIbmCommerceFulfillmentBeansCalculationCodeListDataBeanIBMAssociatedPromotionsListSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	associatedPromotionFindPromotionsByProductWAssociatedPromotionSummaryProfileName = (
		storeId: string,
		query?: {
			/** The product ID. */
			qProductId?: string;
			/** The query name. */
			q?: 'byProduct' | 'byCategory' | 'byName';
			/** The calculation usage ID. */
			qCalculationUsageId?: string;
			/** The calculation code name. */
			qCode?: string;
			/** Whether to exclude the calculation codes that require a promotion code. The default value is <b>true</b>. */
			qIncludePromotionCode?: string;
			/** @format int32 */
			qCategoryId?: number;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/**
			 * The currency code to use for example, currency=USD. If no currency code is specified, the store default currency is used.
			 * @example USD
			 */
			currency?: string;
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: string;
			/** Whether the data bean searches for calculation code based on store path. The default value is <b>true</b>. */
			qEnableStorePath?: string;
			/** Whether to exclude category promotions. The default value is <b>false</b>. */
			qIncludeCategoryPromotions?: string;
			/** Whether to include the child items. The default value is <b>false</b>. */
			qIncludeChildItems?: string;
			/** Whether all the promotions in the store have been created in Management Center. The default value is <b>false</b>. */
			qIncludeNonManagementCenterPromotions?: string;
			/** Whether to retrieve the calculation codes attached to the parent category of the specified catalog group. The default value is <b>false</b>. */
			qIncludeParentCategories?: string;
			/** Whether to retrieve the calculation codes attached to the parent product of the specified catalog entry. The default value is <b>false</b>. */
			qIncludeParentProduct?: string;
			/** Whether to include promotions that are targeted to a member group if the user does not belong to the member group. The default value is <b>false</b>. */
			qIncludeUnentitledPromotionsByMemberGroup?: string;
			/** The ship mode ID. */
			qShipModeId?: string;
			/** The user ID. */
			qUserId?: string;
			/** @format int32 */
			qDisplayLevel?: number;
			/** @format int32 */
			qStoreId?: number;
		},
		params: RequestParams = {}
	) => {
		if (
			!this.traceDetails ||
			this.traceDetails.includes(
				'associatedPromotionFindPromotionsByProductWAssociatedPromotionSummaryProfileName'
			)
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName:
					'associatedPromotionFindPromotionsByProductWAssociatedPromotionSummaryProfileName',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceFulfillmentBeansCalculationCodeListDataBeanIBMAssociatedPromotionsListSummary,
			void
		>({
			path: `/store/${storeId}/associated_promotion`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
