import {
	LayoutAddwidget,
	LayoutAddwidgetResponse,
	LayoutCreatenew,
	LayoutCreatenewResponse,
	LayoutDeleteLayout,
	LayoutDeleteWidget,
	LayoutLayout,
	LayoutLayoutpropertiesRequestBody,
	LayoutLayoutpropertiesResponseBody,
	LayoutUpdatewidget,
	LayoutUpdatewidgetExtendeddata,
	LayoutUpdatewidgetExtendeddataResponse,
	LayoutUpdatewidgetResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Layout<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Performs an action on layout properties. See each action for details on input and output.
	 *
	 * @tags Layout
	 * @name LayoutPerformLayoutPropertiesAction
	 * @summary Update layout properties
	 * @request POST:/store/{storeId}/layout/{layoutId}/layoutProperties
	 * @secure
	 * @response `200` `LayoutLayoutpropertiesResponseBody` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	layoutPerformLayoutPropertiesAction = (
		storeId: string,
		layoutId: string,
		query: {
			/** The action of the rest service. */
			action: 'addLayoutProperties' | 'deleteLayoutProperties' | 'updateLayoutProperties';
		},
		data?: LayoutLayoutpropertiesRequestBody,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('layoutPerformLayoutPropertiesAction'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'layoutPerformLayoutPropertiesAction',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<LayoutLayoutpropertiesResponseBody, void>({
			path: `/store/${storeId}/layout/${layoutId}/layoutProperties`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Searches for layouts based on the layout state and the search criteria. The default sorting order is based on the created date of layouts.
	 *
	 * @tags Layout
	 * @name LayoutSearchLayoutsByState
	 * @summary Get layouts by state and search criteria
	 * @request GET:/store/{storeId}/layout
	 * @secure
	 * @response `200` `LayoutLayout` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	layoutSearchLayoutsByState = (
		storeId: string,
		query: {
			/** The query name. */
			q:
				| 'searchLayoutsByState'
				| 'byLayoutIds'
				| 'getLayoutsByState'
				| 'getTemplatesByDeviceClass'
				| 'getAllTemplatesForStoreAndTool'
				| 'getAllLayoutsForStoreAndTool'
				| 'getLayoutsByStateAndTemplateID'
				| 'getDefaultLayoutsByDeviceClassAndLayoutGroup';
			/** The unique ID of the template used by the layout. */
			templateId: number;
			/** The layout unique ID. */
			layoutId: number;
			/** The layout group name */
			layoutGroup: string;
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName: 'IBM_Admin_Summary' | 'IBM_Admin_Details';
			/** The state of the layout. If this parameter is not specified, the default state is Active. */
			state?: string;
			/**
			 * The ownerID of the layout. When the managingTool is IBM_COMMERCE_INSIGHTS_TOOL, not specifying the ownerID parameter in a pagination request may result in variances based on the caller's Access Control privileges.
			 * @format int64
			 */
			ownerID?: number;
			/** The location name search criteria. */
			locationName?: string;
			/** The layout name search criteria. */
			name?: string;
			/** The sort order for the layouts. The default sort criteria depends on the query. */
			sortBy?: 'CreateDate' | 'TemplateID' | 'LocationName';
			/** The sorting order. The default sort order is ascending. */
			sortOrder?: 'DESC';
			/** The managing tool used. The Default value is IBM_COMMERCE_INSIGHTS_TOOL. */
			managingTool?: 'IBM_MANAGEMENT_CENTER_TOOL' | 'IBM_COMMERCE_INSIGHTS_TOOL';
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
			/** The device class name */
			deviceClass?: 'Web' | 'Mobile' | 'Any';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('layoutSearchLayoutsByState'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'layoutSearchLayoutsByState',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<LayoutLayout, void>({
			path: `/store/${storeId}/layout`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Creates the layout.
	 *
	 * @tags Layout
	 * @name LayoutCreateLayout
	 * @summary Create layout
	 * @request PUT:/store/{storeId}/layout
	 * @secure
	 * @response `201` `LayoutCreatenewResponse` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	layoutCreateLayout = (
		storeId: string,
		data: LayoutCreatenew,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** The server automatically generates a name for the layout. */
			autoGenerateName?: boolean;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('layoutCreateLayout'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'layoutCreateLayout',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<LayoutCreatenewResponse, void>({
			path: `/store/${storeId}/layout`,
			method: 'PUT',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Adds a widget to a layout.
	 *
	 * @tags Layout
	 * @name LayoutAddwidget
	 * @summary Add widget to layout
	 * @request PUT:/store/{storeId}/layout/{layoutId}/widget
	 * @secure
	 * @response `201` `LayoutAddwidgetResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	layoutAddwidget = (
		storeId: string,
		layoutId: string,
		data: LayoutAddwidget,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('layoutAddwidget'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'layoutAddwidget',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<LayoutAddwidgetResponse, void>({
			path: `/store/${storeId}/layout/${layoutId}/widget`,
			method: 'PUT',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Updates widget and widget properties in a layout.
	 *
	 * @tags Layout
	 * @name LayoutUpdateWidget
	 * @summary Update widget and widget properties
	 * @request POST:/store/{storeId}/layout/{layoutId}/widget
	 * @secure
	 * @response `200` `LayoutUpdatewidgetResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	layoutUpdateWidget = (
		storeId: string,
		layoutId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		data?: LayoutUpdatewidget,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('layoutUpdateWidget'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'layoutUpdateWidget',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<LayoutUpdatewidgetResponse, void>({
			path: `/store/${storeId}/layout/${layoutId}/widget`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Deletes a widget from a layout.
	 *
	 * @tags Layout
	 * @name LayoutDeleteWidget
	 * @summary Delete widget from layout
	 * @request DELETE:/store/{storeId}/layout/{layoutId}/widget/{widgetId}
	 * @secure
	 * @response `200` `LayoutDeleteWidget` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	layoutDeleteWidget = (
		storeId: string,
		layoutId: string,
		widgetId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('layoutDeleteWidget'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'layoutDeleteWidget',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<LayoutDeleteWidget, void>({
			path: `/store/${storeId}/layout/${layoutId}/widget/${widgetId}`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Gets layout details by layout unique ID.
	 *
	 * @tags Layout
	 * @name LayoutFindLayoutByUniqueId
	 * @summary Get layout details by unique ID
	 * @request GET:/store/{storeId}/layout/{layoutId}
	 * @secure
	 * @response `200` `LayoutLayout` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	layoutFindLayoutByUniqueId = (
		storeId: string,
		layoutId: number,
		query: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName: 'IBM_Admin_Summary' | 'IBM_Admin_Details';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('layoutFindLayoutByUniqueId'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'layoutFindLayoutByUniqueId',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<LayoutLayout, void>({
			path: `/store/${storeId}/layout/${layoutId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Updates a layout in the store.
	 *
	 * @tags Layout
	 * @name LayoutUpdateLayout
	 * @summary Update layout
	 * @request POST:/store/{storeId}/layout/{layoutId}
	 * @secure
	 * @response `200` `LayoutUpdatewidgetResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	layoutUpdateLayout = (
		storeId: string,
		layoutId: string,
		data: LayoutUpdatewidget,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('layoutUpdateLayout'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'layoutUpdateLayout',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<LayoutUpdatewidgetResponse, void>({
			path: `/store/${storeId}/layout/${layoutId}`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Deletes a layout for a specified store.
	 *
	 * @tags Layout
	 * @name LayoutDeleteLayout
	 * @summary Delete layout for store
	 * @request DELETE:/store/{storeId}/layout/{layoutId}
	 * @secure
	 * @response `200` `LayoutDeleteLayout` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	layoutDeleteLayout = (
		storeId: string,
		layoutId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('layoutDeleteLayout'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'layoutDeleteLayout',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<LayoutDeleteLayout, void>({
			path: `/store/${storeId}/layout/${layoutId}`,
			method: 'DELETE',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Performs an action on widgets extended data. See each action for details on input and output.
	 *
	 * @tags Layout
	 * @name LayoutPerformWidgetExtendedDataAction
	 * @summary Update widget extended data
	 * @request POST:/store/{storeId}/layout/{layoutId}/widget/{widgetId}/extendedData
	 * @secure
	 * @response `200` `LayoutUpdatewidgetExtendeddataResponse` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	layoutPerformWidgetExtendedDataAction = (
		storeId: string,
		layoutId: string,
		widgetId: string,
		query: {
			/** The action of the rest service. */
			action: 'addExtendedData' | 'deleteExtendedData' | 'updateExtendedData';
		},
		data: LayoutUpdatewidgetExtendeddata,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('layoutPerformWidgetExtendedDataAction'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'layoutPerformWidgetExtendedDataAction',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<LayoutUpdatewidgetExtendeddataResponse, void>({
			path: `/store/${storeId}/layout/${layoutId}/widget/${widgetId}/extendedData`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * @description Performs an action on layout static location. See each action for details on input and output.
	 *
	 * @tags Layout
	 * @name LayoutPerformLayoutStaticLocationAction
	 * @summary Update layout static location
	 * @request POST:/store/{storeId}/layout/{layoutId}/layoutStaticLocation
	 * @secure
	 * @response `200` `void` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	layoutPerformLayoutStaticLocationAction = (
		storeId: string,
		layoutId: string,
		query: {
			/** The action of the rest service. */
			action:
				| 'addLayoutStaticLocation'
				| 'deleteLayoutStaticLocation'
				| 'updateLayoutStaticLocation';
		},
		data?: LayoutLayout,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('layoutPerformLayoutStaticLocationAction'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'layoutPerformLayoutStaticLocationAction',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<void, void>({
			path: `/store/${storeId}/layout/${layoutId}/layoutStaticLocation`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			storeId,
			...params,
		});
	};
}
