/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	BUYER_MANAGEMENT_STEPS_TYPE,
	SelectedRolesRecord,
} from '@/data/types/Admin_BuyerManagement';
import { RoleDataBeans } from '@/data/types/Organization';

export const BUYER_MANAGEMENT_REVALIDATION_INTERVAL = 45_000;
export const BUYER_MANAGEMENT_STEPS: BUYER_MANAGEMENT_STEPS_TYPE = [
	{ step: 'AccountInformation' },
	{ step: 'ContactInformation' },
	{ step: 'Roles' },
];

export const BUYER_MANAGEMENT_STEPS_EDIT: BUYER_MANAGEMENT_STEPS_TYPE = [
	...BUYER_MANAGEMENT_STEPS,
	{ step: 'Groups' },
];

export const BUYER_MANAGEMENT = 'buyer-management';

export const ENABLED_STATUS = '1';

export const searchInitialValues = {
	logonId: '',
	firstName: '',
	lastName: '',
	roleId: '',
	accountStatus: '',
	parentOrgId: '',
};

export const DEFAULT_SORT = { orderByFieldName: 'logonId' };
export const ORDER_BY = {
	logonId: (desc: boolean) => ({ orderByFieldName: desc ? 'logonId DESC' : 'logonId' }),
	access: (desc: boolean) => ({ orderByFieldName: desc ? 'status DESC' : 'status' }),
	firstName: (desc: boolean) => ({
		orderByFieldName: desc ? 'firstName DESC' : 'firstName',
		orderByTableName: 'address',
	}),
	lastName: (desc: boolean) => ({
		orderByFieldName: desc ? 'lastName DESC' : 'lastName',
		orderByTableName: 'address',
	}),
};

export const INITIAL_SELECTED_ROLES: SelectedRolesRecord = {};
export const EMPTY_SELECTED_ROLES = {};
export const EMPTY_ROLES: RoleDataBeans[] = [];

// do not fetch again with half minute
export const ROLES_IN_ORGS_FETCH_USER_ROLES_IN_ORGS_I_CAN_ADMIN_FETCHER_DEDUPING_INTERVAL =
	30 * 1000;
