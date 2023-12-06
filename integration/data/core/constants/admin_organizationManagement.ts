/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useLocalization } from '@/data/Localization';
import { EMPTY_STRING } from '@/data/constants/marketing';
import {
	AdminOrganizationRegistration,
	OrganizationManagementFetchRequest,
	RoleAndApprovalGroupsType,
	StateType,
} from '@/data/types/Admin_OrganizationManagement';

export const ORGANIZATION_MANAGEMENT_TABLE = 'organization-management-table';
export const ORGANIZATION = 'organization';

export const ORGANIZATION_MANAGEMENT_TABLE_ACCESSOR_KEYS = {
	organizationName: 'organizationName',
	dn: 'dn',
	type: 'type',
};

export const ORGANIZATION_MANAGEMENT_CREATE_STEPS: Record<
	'step',
	keyof ReturnType<typeof useLocalization<'OrganizationManagement'>>
>[] = [{ step: 'OrganizationDetails' }, { step: 'ContactInformation' }, { step: 'Roles' }];

export const ORGANIZATION_MANAGEMENT_EDIT_STEPS: Record<
	'step',
	keyof ReturnType<typeof useLocalization<'OrganizationManagement'>>
>[] = [
	{ step: 'OrganizationDetails' },
	{ step: 'ContactInformation' },
	{ step: 'Roles' },
	{ step: 'Approvals' },
];

export const DEFAULT_ORGANIZATION_TYPE = 'O';

export const initialSearchValues = {
	q: 'organizationsICanAdmin',
	orgName: '',
	parentOrgName: '',
	orgNameSearchType: 3,
	parentOrgNameSearchType: 3,
} as OrganizationManagementFetchRequest;

export const DEFAULT_URL_FOR_ROLE_AND_APPROVAL_FETCH = '-';
export const ACTION_TYPES_FOR_ROLE_AND_APPROVAL: RoleAndApprovalGroupsType[] = [
	'updateApprovalGroups',
	'assignRole',
	'unassignRole',
];

export const initialOrganizationRegistration: AdminOrganizationRegistration = {
	orgEntityName: EMPTY_STRING,
	description: EMPTY_STRING,
	parentMemberId: EMPTY_STRING,
	orgEntityType: DEFAULT_ORGANIZATION_TYPE,
	administratorFirstName: EMPTY_STRING,
	administratorLastName: EMPTY_STRING,
	email1: EMPTY_STRING,
	address1: EMPTY_STRING,
	address2: EMPTY_STRING,
	city: EMPTY_STRING,
	country: EMPTY_STRING,
	state: EMPTY_STRING,
	zipCode: EMPTY_STRING,
	addToRegisteredCustomersGroup: 'true',
	selectedRoles: {},
};

export const STATES: Record<StateType, StateType> = {
	list: 'list',
	create: 'create',
	edit: 'edit',
};
