import { ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';

export class MemberGroup<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * No description
	 *
	 * @tags Member Group
	 * @name MemberGroupDetail
	 * @summary Finds a member group by its ID.
	 * @request GET:/store/{storeId}/member_group/{memberGroupId}
	 * @secure
	 * @response `200` `ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	memberGroupDetail = (storeId: string, memberGroupId: string, params: RequestParams = {}) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('memberGroupDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'memberGroupDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary, void>(
			{
				path: `/store/${storeId}/member_group/${memberGroupId}`,
				method: 'GET',
				secure: true,
				format: params.format ?? 'json',
				storeId,
				...params,
			}
		);
	};
	/**
	 * No description
	 *
	 * @tags Member Group
	 * @name MemberGroupMemberDetail
	 * @summary Finds a member group current shopper explicitly belongs.
	 * @request GET:/store/{storeId}/member_group/member/{memberId}
	 * @secure
	 * @response `200` `ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	memberGroupMemberDetail = (storeId: string, memberId: string, params: RequestParams = {}) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('memberGroupMemberDetail'))
		) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: null ?? {},
				methodName: 'memberGroupMemberDetail',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary, void>(
			{
				path: `/store/${storeId}/member_group/member/${memberId}`,
				method: 'GET',
				secure: true,
				format: params.format ?? 'json',
				storeId,
				...params,
			}
		);
	};
	/**
	 * No description
	 *
	 * @tags Member Group
	 * @name MemberGroupDetail2
	 * @summary Finds approval member groups types for an organization based on properties filter.
	 * @request GET:/store/{storeId}/member_group
	 * @originalName memberGroupDetail
	 * @duplicate
	 * @secure
	 * @response `200` `ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `404` `void` The specified resource could not be found.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	memberGroupDetail2 = (
		storeId: string,
		query: {
			/** The user ID. */
			userId?: string;
			/** Indicates whether it is excluded group or now */
			exclude?: '0' | '1';
			/** Approval member groups types will be filtered. */
			typeName?: string[];
			/** Properties value based on which approval member groups will be filtered. */
			propertiesFilter?: string;
			/** The query name. */
			q: 'approvalMemberGroupTypes' | 'explicitlyIncludedOrExcluded' | 'manageable';
			/** Order by. */
			orderBy?: string;
			/**
			 *  Page number, starting at 1. Valid values include positive integers of 1 and above. The pageSize must be specified for paging to work.
			 * @format int64
			 */
			pageNumber?: number;
			/**
			 * Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The pageNumber must be specified for paging to work
			 * @format int64
			 */
			pageSize?: number;
		},
		params: RequestParams = {}
	) => {
		const { _requestId: requestId } = params as any;
		delete (params as any)._requestId;

		if (
			loggerCan('trace') &&
			(!this.traceDetails || this.traceDetails.includes('memberGroupDetail2'))
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'memberGroupDetail2',
				requestId,
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary, void>(
			{
				path: `/store/${storeId}/member_group`,
				method: 'GET',
				query: query,
				secure: true,
				format: params.format ?? 'json',
				storeId,
				...params,
			}
		);
	};
}
