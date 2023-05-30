import {
	ComIbmCommerceApprovalBeansApprovalStatusDataBeanIBMStoreSummary,
	ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummaryResultList,
	ComIbmCommerceRestApprovalstatusHandlerApprovalStatusHandlerUpdateApprovalStatusParameterDescription,
	ComIbmCommerceRestApprovalstatusHandlerApprovalStatusHandlerUpdateApprovalStatusResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class ApprovalStatus<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description Gets a list of approval records details that the current authenticated user can approve.
	 *
	 * @tags Approval Status
	 * @name ApprovalStatusFindByQuery
	 * @summary Finds all approval status records available to the current user.
	 * @request GET:/store/{storeId}/approval_status
	 * @secure
	 * @response `200` `ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummaryResultList` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	approvalStatusFindByQuery = (
		storeId: string,
		query: {
			/** The query name. */
			q: 'all' | 'buyerApprovals' | 'orderApprovals';
			/** Query by approval request submitter's first name. */
			submitterFirstName?: string;
			/** Query by approval request submitter's middle name. */
			submitterMiddleName?: string;
			/** Query by approval request submitter's last name. */
			submitterLastName?: string;
			/**
			 * Query by approval request start time.
			 * @format date
			 */
			startSubmitTime?: string;
			/**
			 * Query by approval request end time.
			 * @format date
			 */
			endSubmitTime?: string;
			/**
			 * Query by approval request status. 0 for pending, 1 for approved, 2 for rejected.
			 * @format int32
			 */
			status?: 0 | 1 | 2;
			/**
			 * Query by approval request approval status id.
			 * @format int64
			 */
			approvalStatusId?: number;
			/**
			 * Query by approval request entity id, such as order id.
			 * @format int64
			 */
			entityId?: number;
			/**
			 * Query by approver id. Only returns approval requests that can be approved by the current user.
			 * @format int64
			 */
			approverId?: number;
			/** Order by. */
			orderBy?:
				| 'A-approvalStatusId'
				| 'A-entityId'
				| 'A-submitTime'
				| 'A-approveTime'
				| 'A-status'
				| 'A-flowTypeId'
				| 'A-stateId'
				| 'D-approvalStatusId'
				| 'D-entityId'
				| 'D-submitTime'
				| 'D-approveTime'
				| 'D-status'
				| 'D-flowTypeId'
				| 'D-stateId';
			/**
			 * Page number, starting at 1. Valid values include positive integers of 1 and above. The 'pageSize' must be specified for paging to work.
			 * @format int32
			 */
			pageNumber?: number;
			/**
			 * Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The 'pageNumber' must be specified for paging to work.
			 * @format int32
			 */
			pageSize?: number;
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('approvalStatusFindByQuery')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'approvalStatusFindByQuery',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceApprovalBeansOrderApprovalStatusListDataBeanIBMStoreSummaryResultList,
			void
		>({
			path: `/store/${storeId}/approval_status`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Approve or reject an approval record.
	 *
	 * @tags Approval Status
	 * @name ApprovalStatusUpdateApprovalStatus
	 * @summary Approve or reject an approval record.
	 * @request POST:/store/{storeId}/approval_status/{approvalStatusId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestApprovalstatusHandlerApprovalStatusHandlerUpdateApprovalStatusResponse` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	approvalStatusUpdateApprovalStatus = (
		storeId: string,
		approvalStatusId: string,
		data: ComIbmCommerceRestApprovalstatusHandlerApprovalStatusHandlerUpdateApprovalStatusParameterDescription,
		query?: {
			/** The action name. */
			action?: 'updateApprovalStatus';
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('approvalStatusUpdateApprovalStatus')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'approvalStatusUpdateApprovalStatus',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestApprovalstatusHandlerApprovalStatusHandlerUpdateApprovalStatusResponse,
			void
		>({
			path: `/store/${storeId}/approval_status/${approvalStatusId}`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
	/**
	 * No description
	 *
	 * @tags Approval Status
	 * @name ApprovalStatusDetail
	 * @summary Find an approval status record by its id.
	 * @request GET:/store/{storeId}/approval_status/{approvalStatusId}
	 * @secure
	 * @response `200` `ComIbmCommerceApprovalBeansApprovalStatusDataBeanIBMStoreSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	approvalStatusDetail = (
		storeId: string,
		approvalStatusId: string,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('approvalStatusDetail')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'approvalStatusDetail',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceApprovalBeansApprovalStatusDataBeanIBMStoreSummary,
			void
		>({
			path: `/store/${storeId}/approval_status/${approvalStatusId}`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	};
}
