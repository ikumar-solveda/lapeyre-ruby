import {
	ComIbmCommerceMemberBeansOrganizationListDataBeanIBMOrganizationSummary,
	ComIbmCommerceRestMemberHandlerOrganizationHandlerBuyerRegistrationAddRequest,
	ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityAddRequest,
	ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityBuyerIdentifier,
	ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityIdentity,
	ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityUpdateRequest,
	ComIbmCommerceRestMemberHandlerOrganizationHandlerUpdateApprovalGroups,
	ComIbmCommerceRestMemberHandlerOrganizationHandlerUpdateApprovalGroupsResponse,
	ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetails,
	ComIbmCommerceUserBeansOrgEntityDataBeanIBMParentAssignedRolesDetails,
	ErrorMessageResponseContainer,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

import { logger } from '@/logging/logger';

export class Organization<SecurityDataType = unknown> {
	http: HttpClient<SecurityDataType>;
	traceDetails: string | undefined;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
		this.traceDetails = process.env.TRACE_DETAILS?.trim();
	}

	/**
	 * @description This allows an administrator to find organizations based on query name. See each query for details on input and output.
	 *
	 * @tags Organization
	 * @name OrganizationFindByQuery
	 * @summary This allows an administrator to find organizations based on query name. See each query for details on input and output.
	 * @request GET:/store/{storeId}/organization
	 * @secure
	 * @response `200` `ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetails` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	organizationFindByQuery = (
		storeId: string,
		query: {
			/** Profile name. Profiles determine the subset of data returned by a query. */
			profileName?:
				| 'IBM_Store_Summary'
				| 'IBM_Organization_List_Summary'
				| 'IBM_Organization_List_Short_Summary'
				| 'IBM_Organization_List_Details'
				| 'IBM_Roles_To_Assign_Details';
			/** The query name. <ul><li>organizationHierarchy: Retrieves the organization hierarchy.</li><li>organizationsICanAdmin: This allows an administrator to find organizations that he/she can administer.</li><li>rolesICanAssignInOrg: This allows an administrator to find roles that he/she can assign in organizations.</li></ul> */
			q: 'organizationHierarchy' | 'organizationsICanAdmin' | 'rolesICanAssignInOrg';
			/** The trading account ID. */
			accountId?: string;
			/** The organization identifier. */
			orgId: string;
			/** The organization name. */
			orgName?: string;
			/** The parent organization name. */
			parentOrgName?: string;
			/** The starting index of the result. */
			startIndex?: string;
			/** The maximum number of results to be returned. */
			maxResults?: string;
			/** The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('organizationFindByQuery')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'organizationFindByQuery',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetails,
			void
		>({
			path: `/store/${storeId}/organization`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Allows an administrator to register an organization.
	 *
	 * @tags Organization
	 * @name OrganizationRegisterOrganization
	 * @summary Allows an administrator to register an organization.
	 * @request POST:/store/{storeId}/organization
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityIdentity` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	organizationRegisterOrganization = (
		storeId: string,
		data?: ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityAddRequest,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('organizationRegisterOrganization')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: data ?? {},
				methodName: 'organizationRegisterOrganization',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityIdentity,
			void
		>({
			path: `/store/${storeId}/organization`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Allows administrators to find organization information by organization identifier.
	 *
	 * @tags Organization
	 * @name OrganizationFindByOrganizationIdWParentAssignedRolesDetailsProfileName
	 * @summary Allows administrators to find organization information by organization identifier.
	 * @request GET:/store/{storeId}/organization/{organizationId}
	 * @secure
	 * @response `200` `ComIbmCommerceUserBeansOrgEntityDataBeanIBMParentAssignedRolesDetails` The requested completed successfully.
	 * @response `400` `ErrorMessageResponseContainer` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `ErrorMessageResponseContainer` Not authenticated. The user session is not valid.
	 * @response `403` `ErrorMessageResponseContainer` The user is not authorized to perform the specified request.
	 * @response `500` `ErrorMessageResponseContainer` Internal server error. For details, see the server log files.
	 */
	organizationFindByOrganizationIdWParentAssignedRolesDetailsProfileName = (
		storeId: string,
		organizationId: string,
		query?: {
			/** Profile name. Profiles determine the subset of data returned by a query. Default profile name = IBM_Organization_Summary. */
			profileName?:
				| 'IBM_Organization_Short_Summary'
				| 'IBM_Organization_Summary'
				| 'IBM_Organization_Details'
				| 'IBM_Org_Entity_Details'
				| 'IBM_Assigned_Roles_Details'
				| 'IBM_Parent_Assigned_Roles_Details';
		},
		params: RequestParams = {}
	) => {
		if (
			!this.traceDetails ||
			this.traceDetails.includes(
				'organizationFindByOrganizationIdWParentAssignedRolesDetailsProfileName'
			)
		) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'organizationFindByOrganizationIdWParentAssignedRolesDetailsProfileName',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceUserBeansOrgEntityDataBeanIBMParentAssignedRolesDetails,
			ErrorMessageResponseContainer
		>({
			path: `/store/${storeId}/organization/${organizationId}`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description This allows an administrator to update information of an organization.
	 *
	 * @tags Organization
	 * @name OrganizationUpdateOrganization
	 * @summary This allows an administrator to update information of an organization.
	 * @request PUT:/store/{storeId}/organization/{organizationId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityIdentity` The requested completed successfully.
	 * @response `400` `ErrorMessageResponseContainer` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `ErrorMessageResponseContainer` Not authenticated. The user session is not valid.
	 * @response `403` `ErrorMessageResponseContainer` The user is not authorized to perform the specified request.
	 * @response `500` `ErrorMessageResponseContainer` Internal server error. For details, see the server log files.
	 */
	organizationUpdateOrganization = (
		storeId: string,
		organizationId: string,
		data?: ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityUpdateRequest,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('organizationUpdateOrganization')) {
			const paramsLogger = logger.child({
				params,
				query: null ?? {},
				body: data ?? {},
				methodName: 'organizationUpdateOrganization',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityIdentity,
			ErrorMessageResponseContainer
		>({
			path: `/store/${storeId}/organization/${organizationId}`,
			method: 'PUT',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Performs an action on an organization. See each action for details on input and output. Actions include: updating an approval group, and assigning or unassigning one or more roles from an organization
	 *
	 * @tags Organization
	 * @name OrganizationUpdateApprovalGroups
	 * @summary Performs an action on an organization.
	 * @request POST:/store/{storeId}/organization/{organizationId}
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerOrganizationHandlerUpdateApprovalGroupsResponse` The requested completed successfully.
	 * @response `400` `ErrorMessageResponseContainer` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `ErrorMessageResponseContainer` Not authenticated. The user session is not valid.
	 * @response `403` `ErrorMessageResponseContainer` The user is not authorized to perform the specified request.
	 * @response `500` `ErrorMessageResponseContainer` Internal server error. For details, see the server log files.
	 */
	organizationUpdateApprovalGroups = (
		storeId: string,
		organizationId: string,
		query: {
			/** The action of the rest service. */
			action: 'updateApprovalGroups' | 'assignRole' | 'unassignRole';
		},
		data?: ComIbmCommerceRestMemberHandlerOrganizationHandlerUpdateApprovalGroups,
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('organizationUpdateApprovalGroups')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'organizationUpdateApprovalGroups',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerOrganizationHandlerUpdateApprovalGroupsResponse,
			ErrorMessageResponseContainer
		>({
			path: `/store/${storeId}/organization/${organizationId}`,
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
	 * @description Get user's entitled organizations.
	 *
	 * @tags Organization
	 * @name OrganizationGetEntitledOrganizations
	 * @summary Get user's entitled organizations.
	 * @request GET:/store/{storeId}/organization/@self/entitled_orgs
	 * @secure
	 * @response `200` `ComIbmCommerceMemberBeansOrganizationListDataBeanIBMOrganizationSummary` The requested completed successfully.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	organizationGetEntitledOrganizations = (
		storeId: string,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
			accountCheck?: string;
			explicitEntitlement?: string;
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('organizationGetEntitledOrganizations')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: null ?? {},
				methodName: 'organizationGetEntitledOrganizations',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceMemberBeansOrganizationListDataBeanIBMOrganizationSummary,
			void
		>({
			path: `/store/${storeId}/organization/@self/entitled_orgs`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	};
	/**
	 * @description Registers a new Buyer Organization as well as the initial Buyer Administrator for the new organization.
	 *
	 * @tags Organization
	 * @name OrganizationRegisterBuyerOrganization
	 * @summary Register a new Buyer Organization as well as the initial Buyer Administrator for the new organization.
	 * @request POST:/store/{storeId}/organization/buyer
	 * @secure
	 * @response `200` `ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityBuyerIdentifier` The requested completed successfully.
	 * @response `201` `void` The requested resource has been created.
	 * @response `400` `void` Bad request. The request could not be understood by the server due to malformed syntax.
	 * @response `401` `void` Not authenticated. The user session is not valid.
	 * @response `403` `void` The user is not authorized to perform the specified request.
	 * @response `500` `void` Internal server error. For details, see the server log files.
	 */
	organizationRegisterBuyerOrganization = (
		storeId: string,
		data: ComIbmCommerceRestMemberHandlerOrganizationHandlerBuyerRegistrationAddRequest,
		query?: {
			/** The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json. */
			responseFormat?: 'xml' | 'json';
		},
		params: RequestParams = {}
	) => {
		if (!this.traceDetails || this.traceDetails.includes('organizationRegisterBuyerOrganization')) {
			const paramsLogger = logger.child({
				params,
				query: query ?? {},
				body: data ?? {},
				methodName: 'organizationRegisterBuyerOrganization',
			});
			paramsLogger.trace('API request parameters');
		}
		return this.http.request<
			ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityBuyerIdentifier,
			void
		>({
			path: `/store/${storeId}/organization/buyer`,
			method: 'POST',
			query: query,
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	};
}
