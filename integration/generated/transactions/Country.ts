import {
	ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummary,
	ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateName,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Country<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets a list of countries or regions with the corresponding states or provinces.
	 *
	 * @tags Country
	 * @name CountryFindCountryStateList
	 * @summary Get countries and regions
	 * @request GET:/store/{storeId}/country/country_state_list
	 * @secure
	 * @response `200` `ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	countryFindCountryStateList = (
		storeId: string,
		query?: {
			/** Profile name. Profiles determine the subset of data returned by a query.  Default profile name = IBM_countryStateList_Summary. */
			profileName?: 'IBM_countryStateList_Summary';
			/** The country or region abbreviation code. */
			countryCode?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('countryFindCountryStateList'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'countryFindCountryStateList',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummary,
			void
		>({
			path: `/store/${storeId}/country/country_state_list`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets the display name of a country and/or a state.
	 *
	 * @tags Country
	 * @name CountryFindCountryStateName
	 * @summary Get display name of countries and regions
	 * @request GET:/store/{storeId}/country/country_state_name
	 * @secure
	 * @response `200` `ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateName` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	countryFindCountryStateName = (
		storeId: string,
		query?: {
			/** Profile name. Profiles determine the subset of data returned by a query. The default profile name is IBM_countryStateName. */
			profileName?: 'IBM_countryStateName';
			/** The country or region abbreviation code. */
			countryCode?: string;
			/** The state or province abbreviation code. */
			stateCode?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('countryFindCountryStateName'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'countryFindCountryStateName',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateName,
			void
		>({
			path: `/store/${storeId}/country/country_state_name`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
