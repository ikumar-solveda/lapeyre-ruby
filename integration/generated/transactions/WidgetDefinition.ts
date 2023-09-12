import { WidgetDefinitionIBMAdminSummary, WidgetDefinitionIBMStoreSummary } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class WidgetDefinition<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Finds widget definitions by widget types. Invalid widget types are ignored.
	 *
	 * @tags Widget Definition
	 * @name WidgetDefinitionByWidgetTypes
	 * @summary Get by widget type
	 * @request GET:/store/{storeId}/widget_definition
	 * @secure
	 * @response `200` `WidgetDefinitionIBMAdminSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	widgetDefinitionByWidgetTypes = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'byWidgetTypes' | 'byIdentifiers' | 'byWidgetDefinitionIds';
			/** The widget type. */
			widgetType: number[];
			/** The widget definition identifier. */
			identifier: string;
			/** The widget definition ID. */
			widgetDefinitionId: string;
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?: 'IBM_Admin_Summary' | 'IBM_Admin_All';
			/** Boolean flag to indicate if inactive widget definitions must be included in the response. By default inactive widgets are filtered. */
			includeInactiveWidgets?: boolean;
			/** Data languages restrict the language specific data in the result to the languages specified. */
			dataLanguageIds?: number[];
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
			(!this.traceDetails || this.traceDetails.includes('widgetDefinitionByWidgetTypes'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'widgetDefinitionByWidgetTypes',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<WidgetDefinitionIBMAdminSummary, void>({
			path: `/store/${storeId}/widget_definition`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Finds a widget definition by its identifier.
	 *
	 * @tags Widget Definition
	 * @name WidgetDefinitionFindByIdentifier
	 * @summary Get by identifier
	 * @request GET:/store/{storeId}/widget_definition/identifier/{identifier}
	 * @secure
	 * @response `200` `WidgetDefinitionIBMStoreSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	widgetDefinitionFindByIdentifier = (
		storeId: string,
		identifier: string,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('widgetDefinitionFindByIdentifier'))
		) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'widgetDefinitionFindByIdentifier',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<WidgetDefinitionIBMStoreSummary, void>({
			path: `/store/${storeId}/widget_definition/identifier/${identifier}`,
			method: 'GET',
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * @description Finds a widget definition by its ID.
	 *
	 * @tags Widget Definition
	 * @name WidgetDefinitionFindByWidgetDefinitionId
	 * @summary Get by ID
	 * @request GET:/store/{storeId}/widget_definition/{widgetDefinitionId}
	 * @secure
	 * @response `200` `WidgetDefinitionIBMStoreSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	widgetDefinitionFindByWidgetDefinitionId = (
		storeId: string,
		widgetDefinitionId: string,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('widgetDefinitionFindByWidgetDefinitionId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'widgetDefinitionFindByWidgetDefinitionId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<WidgetDefinitionIBMStoreSummary, void>({
			path: `/store/${storeId}/widget_definition/${widgetDefinitionId}`,
			method: 'GET',
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
