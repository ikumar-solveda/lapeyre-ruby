import {
	WorkspaceChangeworkspacestatus,
	WorkspaceCreateworkspace,
	WorkspaceGetworkspace,
	WorkspaceGetworkspaceById,
	WorkspaceUpdateworkspace,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class Workspace<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags workspace
	 * @name WorkspaceDetail
	 * @summary Finds workspaces by a query. See each query for details on input and output.
	 * @request GET:/store/{storeId}/workspace
	 * @secure
	 * @response `200` `WorkspaceGetworkspace` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	workspaceDetail = (
		storeId: string,
		query: {
			/** the query name. */
			q: 'byStatus';
			/** The status of the workspace. */
			status: 'Active' | 'Complete' | 'Cancelled' | 'Cancel in progress';
			/** Profile name. Profiles determine the subset of data to be returned by a query. */
			profileName?: 'IBM_Admin_All';
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work. */
			pageNumber?: number;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work. */
			pageSize?: number;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('workspaceDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'workspaceDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<WorkspaceGetworkspace, void>({
			path: `/store/${storeId}/workspace`,
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
	 * @tags workspace
	 * @name WorkspaceWorkspaceIdDetail
	 * @summary Finds a workspace by its ID.
	 * @request GET:/store/{storeId}/workspace/workspaceId/{workspaceId}
	 * @secure
	 * @response `200` `WorkspaceGetworkspaceById` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	workspaceWorkspaceIdDetail = (
		storeId: string,
		workspaceId: string,
		query?: {
			/** Profile name. Profiles determine the subset of data to be returned by a query. */
			profileName?: string;
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
			(!this.traceDetails || this.traceDetails.includes('workspaceWorkspaceIdDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'workspaceWorkspaceIdDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<WorkspaceGetworkspaceById, void>({
			path: `/store/${storeId}/workspace/workspaceId/${workspaceId}`,
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
	 * @tags workspace
	 * @name WorkspaceCreateWorkspaceCreate
	 * @summary Create a worskpace.
	 * @request POST:/store/{storeId}/workspace/createWorkspace
	 * @secure
	 * @response `200` `WorkspaceCreateworkspace` The requested completed successfully.
	 * @response `201` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	workspaceCreateWorkspaceCreate = (
		storeId: string,
		query: {
			/** the name of the workspace. */
			name: string;
			/** the description of the workspace. */
			description?: string;
			/** Whether the workspace is persistent. */
			persistent?: string;
			/** Whether the workspace is an emergency fix.. */
			emergencyFix?: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('workspaceCreateWorkspaceCreate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'workspaceCreateWorkspaceCreate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<WorkspaceCreateworkspace, void>({
			path: `/store/${storeId}/workspace/createWorkspace`,
			method: 'POST',
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
	 * @tags workspace
	 * @name WorkspaceUpdateWorkspaceUpdate
	 * @summary Update a workspace.
	 * @request PUT:/store/{storeId}/workspace/updateWorkspace
	 * @secure
	 * @response `200` `WorkspaceUpdateworkspace` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` The user isn't authorized to perform the specified request.
	 * @response `403` `void` Not authenticated. The user session isn't valid.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	workspaceUpdateWorkspaceUpdate = (
		storeId: string,
		query: {
			/** the workspace identifier. */
			workspaceId: string;
			/** the name of the workspace. */
			name: string;
			/** the description of the workspace. */
			description?: string;
			/** Whether the workspace is persistent. */
			persistent?: string;
			/** Whether the workspace is an emergency fix.. */
			emergencyFix?: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('workspaceUpdateWorkspaceUpdate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'workspaceUpdateWorkspaceUpdate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<WorkspaceUpdateworkspace, void>({
			path: `/store/${storeId}/workspace/updateWorkspace`,
			method: 'PUT',
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
	 * @tags workspace
	 * @name WorkspaceChangeStatusUpdate
	 * @summary Change workspace status by performing an action on it.
	 * @request PUT:/store/{storeId}/workspace/changeStatus
	 * @secure
	 * @response `200` `WorkspaceChangeworkspacestatus` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isnt valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	workspaceChangeStatusUpdate = (
		storeId: string,
		query: {
			/** the workspace identifier. */
			workspaceId: string;
			/**
			 * The change status action to perform on workspace.
			 * @example ACTION_CANCEL_WORKSPACE
			 */
			actionType: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('workspaceChangeStatusUpdate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'workspaceChangeStatusUpdate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<WorkspaceChangeworkspacestatus, void>({
			path: `/store/${storeId}/workspace/changeStatus`,
			method: 'PUT',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			storeId,
			...params,
		});
	};
}
