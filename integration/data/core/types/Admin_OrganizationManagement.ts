/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { useLocalization } from '@/data/Localization';
import { RequestQuery } from '@/data/types/RequestQuery';
import {
	ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList,
	ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetails,
	ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetailsOrganizationDataBeans,
	OraganizationAdministratorToFindOrganizationInformationByOrganizationIdentifier,
} from 'integration/generated/transactions/data-contracts';

type OrganizationDataBeans =
	ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetailsOrganizationDataBeans;

export type OrganizationManagementTableData = OrganizationDataBeans & {
	organizationName?: string;
	distinguishedName?: string;
	orgEntityType?: string;
};

export type OrganizationDataBeanWithContactInformation = OrganizationDataBeans & {
	contactInfo: OraganizationAdministratorToFindOrganizationInformationByOrganizationIdentifier;
};

export type OrganizationManagementResponse = Omit<
	ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetails,
	'organizationDataBeans'
> & {
	organizationDataBeans?: ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetailsOrganizationDataBeans[];
};

export type OrganizationManagementFetchRequest = RequestQuery & {
	profileName?:
		| 'IBM_Store_Summary'
		| 'IBM_Organization_List_Summary'
		| 'IBM_Organization_List_Short_Summary'
		| 'IBM_Organization_List_Details'
		| 'IBM_Roles_To_Assign_Details';
	q: 'organizationHierarchy' | 'organizationsICanAdmin' | 'rolesICanAssignInOrg';
	accountId?: string;
	orgId: string;
	orgName?: string;
	orgNameSearchType: string | number;
	parentOrgName?: string;
	parentOrgNameSearchType?: string | number;
	startIndex?: string;
	maxResults?: string;
};

export const ORGANIZATION_MANAGEMENT_REVALIDATION_INTERVAL = 45_000;

export type StateType = 'list' | 'create' | 'edit';

export type ActionContext = {
	state: StateType;
};

export type RoleDetails = {
	roleId: string;
	displayName?: string;
	description?: string;
	name?: string;
};

export type OrganizationRolesDetails = {
	displayName?: string;
	memberId?: string;
	rolesWithDetails?: RoleDetails[];
};

export type RoleAndApprovalGroupsType = 'updateApprovalGroups' | 'assignRole' | 'unassignRole';

export type AdminOrganizationRegistration = {
	orgEntityName: string;
	description: string;
	parentMemberId: string;
	orgEntityType: string;
	administratorFirstName: string;
	administratorLastName: string;
	email1: string;
	address1: string;
	address2: string;
	city: string;
	country: string;
	state: string;
	zipCode: string;
	addToRegisteredCustomersGroup: string;
	selectedRoles: Record<string, true>;
	roles?: Record<string, true>;
	approvalTypes?: ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummaryResultList[];
	approvals?: Record<string, true>;
	selectedApprovals?: Record<string, true>;
	organizationId?: string;
	isEdit?: boolean;
};

export type OrganizationManagementStepsType = Record<
	'step',
	keyof ReturnType<typeof useLocalization<'OrganizationManagement'>>
>[];
