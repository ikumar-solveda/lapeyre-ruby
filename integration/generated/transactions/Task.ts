import {
	TaskCreateTask,
	TaskGetTaskByID,
	TaskIBMAdminAll,
	TaskUpdateStatusByActionType,
	TaskUpdateTaskByNameAndID,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Task<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags task
	 * @name TaskCreateTaskCreate
	 * @summary Create a task.
	 * @request POST:/store/{storeId}/task/createTask
	 * @secure
	 * @response `200` `TaskCreateTask` The requested completed successfully.
	 * @response `201` `void` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	taskCreateTaskCreate = (
		storeId: string,
		query: {
			/** The taskgroupId identifier. */
			taskgroupId: string;
			/** The name of the task group. */
			name: string;
			/** The description of the task group. */
			description?: string;
			/** Date and time the task group is due. */
			dueDate?: string;
			/** The list of contributors for the task. Separate multiple with a comma. */
			contributors?: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('taskCreateTaskCreate')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'taskCreateTaskCreate',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<TaskCreateTask, void>({
			path: `/store/${storeId}/task/createTask`,
			method: 'POST',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags task
	 * @name TaskTaskIdDetail
	 * @summary Finds a task by its ID.
	 * @request GET:/store/{storeId}/task/taskId/{taskId}
	 * @secure
	 * @response `200` `TaskIBMAdminAll` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	taskTaskIdDetail = (
		storeId: string,
		taskId: string,
		query?: {
			/** Profile name. Profiles determine the subset of data to be returned by a query. */
			profileName?: string;
			/** Page number, starting at 1. Valid values include positive integers of 1 and above. The pageSize must be specified for paging to work. */
			pageNumber?: number;
			/** Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The pageNumber must be specified for paging to work.. */
			pageSize?: number;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('taskTaskIdDetail')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'taskTaskIdDetail',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<TaskIBMAdminAll, void>({
			path: `/store/${storeId}/task/taskId/${taskId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags task
	 * @name TaskDetail
	 * @summary Finds tasks by a query. See each query for details on input and output.
	 * @request GET:/store/{storeId}/task
	 * @secure
	 * @response `200` `TaskGetTaskByID` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	taskDetail = (
		storeId: string,
		query: {
			/** the query name . */
			q: 'byTaskGroupId' | 'byStatus';
			/** The status of the task. */
			status: string;
			/** The task group identifier. */
			taskGroupId: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('taskDetail')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'taskDetail',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<TaskGetTaskByID, void>({
			path: `/store/${storeId}/task`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags task
	 * @name TaskChangeStatusUpdate
	 * @summary Change task status by performing an action on it.
	 * @request PUT:/store/{storeId}/task/changeStatus
	 * @secure
	 * @response `200` `TaskUpdateStatusByActionType` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	taskChangeStatusUpdate = (
		storeId: string,
		query: {
			/** The task identifier. */
			taskId: string;
			/** The task group identifier. */
			taskGroupId: string;
			/**
			 * The change status action to perform on task.
			 * @example ACTION_COMPLETE, ACTION_RETURN_TO_WORKING, ACTION_REJECT
			 */
			actionType: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('taskChangeStatusUpdate')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'taskChangeStatusUpdate',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<TaskUpdateStatusByActionType, void>({
			path: `/store/${storeId}/task/changeStatus`,
			method: 'PUT',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags task
	 * @name TaskUpdateTaskUpdate
	 * @summary Update a task..
	 * @request PUT:/store/{storeId}/task/updateTask
	 * @secure
	 * @response `200` `TaskUpdateTaskByNameAndID` The requested completed successfully.
	 * @response `400` `void` Bad request. Some of the inputs provided to the request aren't valid.
	 * @response `401` `void` Not authenticated. The user session isn't valid.
	 * @response `403` `void` The user isn't authorized to perform the specified request.
	 * @response `500` `void` Internal server error. Additional details will be contained on the server logs.
	 */
	taskUpdateTaskUpdate = (
		storeId: string,
		query: {
			/** The task identifier. */
			taskId: string;
			/** The name of the task group. */
			name: string;
			/** The description of the task group. */
			description?: string;
			/** Date and time the task group is due. */
			dueDate?: string;
			/** The list of contributors for the task. Separate multiple with a comma. */
			contributors?: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include json and xml without the quotes. If the responseFormat isn't specified, the accept HTTP header shall be used to determine the format of the response. If the accept HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('taskUpdateTaskUpdate')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'taskUpdateTaskUpdate',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<TaskUpdateTaskByNameAndID, void>({
			path: `/store/${storeId}/task/updateTask`,
			method: 'PUT',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
}
