import {
	CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttribute,
	CatalogEntryIBMAdminStandardOfferPrice,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class CatalogEntry<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Finds catalog entries by their parent part number. Invalid part number is ignored.
	 *
	 * @tags Catalog Entry
	 * @name CatalogEntryByParentPartNumbers
	 * @summary Get catalog entries by parent part
	 * @request GET:/store/{storeId}/catalog_entry
	 * @secure
	 * @response `200` `CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttribute` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	catalogEntryByParentPartNumbers = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byParentPartNumbers' | 'byPartNumbers';
			/** The part number of the parent catalog entry. */
			partNumber: string[];
			/** Language identifier. If not specified, the "locale" parameter is used. If "locale" is not specified, then the store default language is used. */
			langId?: string;
			/** The unique id of the catalog to search the catalog entries under. If no catalog specified, store default catalog is used. */
			catalogId?: string;
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?:
				| 'IBM_Admin_Summary'
				| 'IBM_Admin_CatalogEntryDefiningAttributeDictionaryAttribute'
				| 'IBM_Admin_StandardOfferPrice';
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
			/** The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used. */
			currency?:
				| 'ARS'
				| 'ATS'
				| 'AUD'
				| 'BEF'
				| 'BRL'
				| 'CAD'
				| 'CHF'
				| 'CNY'
				| 'DEM'
				| 'DKK'
				| 'EGP'
				| 'ESP'
				| 'EUR'
				| 'FIM'
				| 'FRF'
				| 'GBP'
				| 'HKD'
				| 'IEP'
				| 'ITL'
				| 'JPY'
				| 'KRW'
				| 'LUF'
				| 'NLG'
				| 'NOK'
				| 'PLN'
				| 'PTE'
				| 'ROL'
				| 'RON'
				| 'RUB'
				| 'SEK'
				| 'SGD'
				| 'TWD'
				| 'USD'
				| 'ZAR';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('catalogEntryByParentPartNumbers'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'catalogEntryByParentPartNumbers',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			CatalogEntryIBMAdminCatalogEntryDefiningAttributeDictionaryAttribute,
			void
		>({
			path: `/store/${storeId}/catalog_entry`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets catalog entries by search term.
	 *
	 * @tags Catalog Entry
	 * @name CatalogEntryFindBySearchTerm
	 * @summary Get catalog entries by search term
	 * @request GET:/store/{storeId}/catalog_entry/bySearchTerm/{searchTerm}
	 * @secure
	 * @response `200` `CatalogEntryIBMAdminStandardOfferPrice` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	catalogEntryFindBySearchTerm = (
		storeId: string,
		searchTerm: string,
		query?: {
			/** The catalog entry types to return. */
			type?: (
				| 'Product'
				| 'Item'
				| 'CategoryItem'
				| 'Bundle'
				| 'Package'
				| 'DynamicKit'
				| 'PredDynaKit'
			)[];
			/** The catalog entry types that are not returned. */
			excludeType?: ('Product' | 'Item' | 'Bundle' | 'Package' | 'DynamicKit' | 'PredDynaKit')[];
			/** Language identifier. If not specified, the "locale" parameter is used. If "locale" is not specified, then the store default language is used. */
			langId?: string;
			/** The unique id of the catalog to search the catalog entries under. If no catalog specified, store default catalog is used. */
			catalogId?: string;
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: 'IBM_Admin_Summary' | 'IBM_Admin_StandardOfferPrice';
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
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('catalogEntryFindBySearchTerm'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'catalogEntryFindBySearchTerm',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<CatalogEntryIBMAdminStandardOfferPrice, void>({
			path: `/store/${storeId}/catalog_entry/bySearchTerm/${searchTerm}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
