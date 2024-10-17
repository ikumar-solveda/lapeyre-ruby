/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { PersonContact } from '@/data/types/Person';
import {
	ComIbmCommerceMemberBeansOrganizationListDataBeanIBMOrganizationSummaryEntitledOrganizations,
	ComIbmCommerceRestMemberHandlerPersonHandlerMemberRoleAssignmentRequest,
	ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetailsOrganizationDataBeans,
	ComIbmCommerceUserBeansOrgEntityDataBeanIBMParentAssignedRolesDetails,
	ComIbmCommerceUserBeansOrgEntityDataBeanIBMParentAssignedRolesDetailsParentRolesWithDetails,
	OraganizationAdministratorAddressBook,
	OraganizationAdministratorToFindOrganizationInformationByOrganizationIdentifier,
} from 'integration/generated/transactions/data-contracts';

export type OrganizationResponseAddress =
	OraganizationAdministratorToFindOrganizationInformationByOrganizationIdentifier &
		OraganizationAdministratorAddressBook;
export type OrganizationResponse =
	ComIbmCommerceUserBeansOrgEntityDataBeanIBMParentAssignedRolesDetails;
export type OrganizationAddress = PersonContact & { isOrgAddress?: boolean };
export type OrganizationType = OrganizationResponse & { addresses: OrganizationAddress[] };

export type OrganizationSearchDataBeanIBMOrganizationListDetails = {
	pageNumber?: number;
	pageSize?: number;
	recordSetCount?: number;
	recordSetTotal?: number;
	organizationHierarchy?: string[];
	recordSetCompleteIndicator?: boolean;
	organizationDataBeans?: ComIbmCommerceMemberBeansOrganizationListDataBeanIBMOrganizationSummaryEntitledOrganizations[];
};

export type RoleSearchDataBeanIBMOrganizationListDetails = {
	pageNumber?: number;
	pageSize?: number;
	recordSetCount?: number;
	recordSetTotal?: number;
	organizationHierarchy?: string[];
	recordSetCompleteIndicator?: boolean;
	roleDataBeans?: ComIbmCommerceUserBeansOrgEntityDataBeanIBMParentAssignedRolesDetailsParentRolesWithDetails[];
};

/**
 * @deprecated DO NOT USE
 */
export type OrganizationDataBeans =
	ComIbmCommerceMemberBeansOrganizationListDataBeanIBMOrganizationSummaryEntitledOrganizations;

export type OrganizationDataBean =
	ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetailsOrganizationDataBeans;

export type RoleDataBeans =
	ComIbmCommerceUserBeansOrgEntityDataBeanIBMParentAssignedRolesDetailsParentRolesWithDetails & {
		displayName: string;
		roleId: string;
		name: string;
		description: string | null;
	};

export type RolesToAssignDetailsResponse = {
	roleDataBeans: RoleDataBeans[];
};

export type OrgAndRoleDisplay = {
	roleName: string;
	orgName: string;
};
export type OrgsAndRoles = Record<string, Record<string, OrgAndRoleDisplay>>;

export type OrgIdsAndRoleIds =
	ComIbmCommerceRestMemberHandlerPersonHandlerMemberRoleAssignmentRequest;
