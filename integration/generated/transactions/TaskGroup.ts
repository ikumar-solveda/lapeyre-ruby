import {
	TaskGroupCreateTaskGroupCommentUsingAllMandetoryParameter,
	TaskGroupCreateTaskGroupUsingAllMandetoryParameters,
	TaskGroupGetTaskGroupById,
	TaskGroupIBMAdminAll,
	TaskGroupUpdateStatusByActionType,
	TaskGroupUpdateTaskGroupUsingNameAndID,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class TaskGroup<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags task_group
	 * @name TaskGroupCreateTaskGroupCreate
	 * @summary Create a task group.
	 * @request POST:/store/{storeId}/task_group/createTaskGroup
	 * @secure
	 * @response `200` `TaskGroupCreateTaskGroupUsingAllMandetoryParameters` The requested completed successfully.
	 * @response `201` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	taskGroupCreateTaskGroupCreate = (
		storeId: string,
		query: {
			/** The name of the task group. */
			name: string;
			/** The workspaceId of the task group. */
			workspaceId: string;
			/** The description of the task group. */
			description?: string;
			/** Whether to quick publish task group. */
			quickPublish?: string;
			/** Whether task group is persistent. */
			persistent?: string;
			/** Date and time the task group is due. */
			dueDate?: string;
			/** Date and time to commit task group. */
			promotionDate?: string;
			/** The list of approvers for the task group. Separate multiple approvers with a comma. */
			approvers?: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('taskGroupCreateTaskGroupCreate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'taskGroupCreateTaskGroupCreate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<TaskGroupCreateTaskGroupUsingAllMandetoryParameters, void>({
			path: `/store/${storeId}/task_group/createTaskGroup`,
			method: 'POST',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags task_group
	 * @name TaskGroupCreateTaskGroupCommentCreate
	 * @summary Create a task group comment.
	 * @request POST:/store/{storeId}/task_group/createTaskGroupComment
	 * @secure
	 * @response `200` `TaskGroupCreateTaskGroupCommentUsingAllMandetoryParameter` The requested completed successfully.
	 * @response `201` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	taskGroupCreateTaskGroupCommentCreate = (
		storeId: string,
		query: {
			/** The taskgroupId identifier. */
			taskgroupId: string;
			/** The taskgroup comment. */
			comment: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('taskGroupCreateTaskGroupCommentCreate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'taskGroupCreateTaskGroupCommentCreate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<TaskGroupCreateTaskGroupCommentUsingAllMandetoryParameter, void>({
			path: `/store/${storeId}/task_group/createTaskGroupComment`,
			method: 'POST',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags task_group
	 * @name TaskGroupChangeStatusUpdate
	 * @summary Change task group status by performing an action on it.
	 * @request PUT:/store/{storeId}/task_group/changeStatus
	 * @secure
	 * @response `200` `TaskGroupUpdateStatusByActionType` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	taskGroupChangeStatusUpdate = (
		storeId: string,
		query: {
			/** The taskgroupId identifier. */
			taskgroupId: string;
			/**
			 * The change status action to perform on task group.
			 * @example ACTION_APPROVE, ACTION_ACTIVATE, ACTION_RETURN_TO_ACTIVE, ACTION_CANCEL, ACTION_REJECT
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
			(!this.traceDetails || this.traceDetails.includes('taskGroupChangeStatusUpdate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'taskGroupChangeStatusUpdate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<TaskGroupUpdateStatusByActionType, void>({
			path: `/store/${storeId}/task_group/changeStatus`,
			method: 'PUT',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags task_group
	 * @name TaskGroupUpdateTaskGroupUpdate
	 * @summary Update a task group.
	 * @request PUT:/store/{storeId}/task_group/updateTaskGroup
	 * @secure
	 * @response `200` `TaskGroupUpdateTaskGroupUsingNameAndID` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	taskGroupUpdateTaskGroupUpdate = (
		storeId: string,
		query: {
			/** The taskgroupId identifier. */
			taskgroupId: string;
			/** The name of the task group. */
			name: string;
			/** The description of the task group. */
			description?: string;
			/** Whether to quick publish task group. */
			quickPublish?: string;
			/** Whether task group is persistent. */
			persistent?: string;
			/** Date and time the task group is due. */
			dueDate?: string;
			/** Date and time to commit task group. */
			promotionDate?: string;
			/** The list of approvers for the task group. Separate multiple approvers with a comma. */
			approvers?: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('taskGroupUpdateTaskGroupUpdate'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'taskGroupUpdateTaskGroupUpdate',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<TaskGroupUpdateTaskGroupUsingNameAndID, void>({
			path: `/store/${storeId}/task_group/updateTaskGroup`,
			method: 'PUT',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags task_group
	 * @name TaskGroupTaskGroupIdDetail
	 * @summary Finds a task group by its ID..
	 * @request GET:/store/{storeId}/task_group/taskGroupId/{taskGroupId}
	 * @secure
	 * @response `200` `TaskGroupIBMAdminAll` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `404` `void` Not authenticated. The user session isn't valid.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	taskGroupTaskGroupIdDetail = (
		storeId: string,
		taskGroupId: string,
		query?: {
			/** Profile name. Profiles determine the subset of data to be returned by a query. */
			profileName?: string;
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The pageSize must be specified for paging to work.. */
			pageNumber?: number;
			/** age size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The pageNumber must be specified for paging to work. */
			pageSize?: number;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('taskGroupTaskGroupIdDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'taskGroupTaskGroupIdDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<TaskGroupIBMAdminAll, void>({
			path: `/store/${storeId}/task_group/taskGroupId/${taskGroupId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags task_group
	 * @name TaskGroupDetail
	 * @summary Finds task groups by a query. See each query for details on input and output.
	 * @request GET:/store/{storeId}/task_group
	 * @secure
	 * @response `200` `TaskGroupGetTaskGroupById` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `404` `void` Not authenticated. The user session isn't valid.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	taskGroupDetail = (
		storeId: string,
		query: {
			/** The task group identifier. */
			q: 'byWorkspaceId';
			/** The workspace identifier. */
			workspaceId: string;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('taskGroupDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'taskGroupDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<TaskGroupGetTaskGroupById, void>({
			path: `/store/${storeId}/task_group`,
			method: 'GET',
			query: query,
			secure: true,
			format: params.format ?? 'json',
			...params,
		});
	};
}
