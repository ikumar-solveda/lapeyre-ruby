import {
	ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummary,
	ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListConfigurationAddRequest,
	ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListDeleteResponse,
	ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListSubmitRequest,
	ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListUpdateRequest,
	RequisitionListRequisitionList,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class RequisitionList<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags requisition_list
	 * @name RequisitionListCreate
	 * @summary Add pre-configured dynamic kits or dynamic kit configurations to a requisition list.
	 * @request POST:/store/{storeId}/requisition_list
	 * @secure
	 * @response `200` `RequisitionListRequisitionList` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	requisitionListCreate = (
		storeId: string,
		query: {
			/** the action. Possible values are: copy, updateItem,updateConfiguration. */
			action: string;
		},
		data?: ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListConfigurationAddRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('requisitionListCreate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'requisitionListCreate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<RequisitionListRequisitionList, void>({
			path: `/store/${storeId}/requisition_list`,
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
	 * No description
	 *
	 * @tags requisition_list
	 * @name RequisitionListDetail
	 * @summary Finds requisition lists that can be used by the current user.
	 * @request GET:/store/{storeId}/requisition_list
	 * @secure
	 * @response `200` `ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	requisitionListDetail = (
		storeId: string,
		query: {
			/** the query name. */
			q: 'usable' | 'self';
			/** Order by. */
			orderBy?: string[] | string;
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The pageSize must be specified for paging to work. */
			pageNumber?: number;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The pageNumber must be specified for paging to work. */
			pageSize?: number;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('requisitionListDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'requisitionListDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummary, void>({
			path: `/store/${storeId}/requisition_list`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags requisition_list
	 * @name RequisitionListUpdate
	 * @request PUT:/store/{storeId}/requisition_list/{requisitionListId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListUpdateRequest` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	requisitionListUpdate = (
		storeId: string,
		requisitionListId: string,
		data?: ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListUpdateRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('requisitionListUpdate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: data ?? {},
				methodName: 'requisitionListUpdate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListUpdateRequest,
			void
		>({
			path: `/store/${storeId}/requisition_list/${requisitionListId}`,
			method: 'PUT',
			body: data,
			secure: true,
			type: params.type ?? ContentType.Json,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags requisition_list
	 * @name RequisitionListCreate2
	 * @summary Submits a requisition list.
	 * @request POST:/store/{storeId}/requisition_list/{requisitionListId}
	 * @originalName requisitionListCreate
	 * @duplicate
	 * @secure
	 * @response `200` `ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListSubmitRequest` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	requisitionListCreate2 = (
		storeId: string,
		requisitionListId: string,
		query: {
			/**
			 * the action.
			 * @example addConfiguration
			 */
			action: string;
		},
		data?: ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListSubmitRequest,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('requisitionListCreate2'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'requisitionListCreate2',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListSubmitRequest,
			void
		>({
			path: `/store/${storeId}/requisition_list/${requisitionListId}`,
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
	 * No description
	 *
	 * @tags requisition_list
	 * @name RequisitionListDetail2
	 * @summary Finds a requisition list by its ID.
	 * @request GET:/store/{storeId}/requisition_list/{requisitionListId}
	 * @originalName requisitionListDetail
	 * @duplicate
	 * @secure
	 * @response `200` `ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	requisitionListDetail2 = (
		storeId: string,
		requisitionListId: string,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('requisitionListDetail2'))
		) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'requisitionListDetail2',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceOrderBeansRequisitionListDataBeanIBMStoreSummary, void>({
			path: `/store/${storeId}/requisition_list/${requisitionListId}`,
			method: 'GET',
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags requisition_list
	 * @name RequisitionListDelete
	 * @summary Deletes a requisition list.
	 * @request DELETE:/store/{storeId}/requisition_list/{requisitionListId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListDeleteResponse` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	requisitionListDelete = (
		storeId: string,
		requisitionListId: string,
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('requisitionListDelete'))
		) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'requisitionListDelete',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestRequisitionlistHandlerRequisitionListHandlerRequisitionListDeleteResponse,
			void
		>({
			path: `/store/${storeId}/requisition_list/${requisitionListId}`,
			method: 'DELETE',
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
