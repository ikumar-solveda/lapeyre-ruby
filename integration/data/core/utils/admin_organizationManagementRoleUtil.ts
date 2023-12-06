/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { AdminOrganizationRegistration } from '@/data/types/Admin_OrganizationManagement';
import { isEmpty } from 'lodash';

export const getRoleDeltas = (values: AdminOrganizationRegistration) => {
	const { selectedRoles } = values;
	const addedRoles = {} as Record<string, string>;
	const removedRoles = {} as Record<string, string>;
	const selectedRoleIds = Object.keys(selectedRoles);
	const originalRoleIds = Object.keys(values?.roles ?? {});

	// check which of the original roles are no longer there and remove them (unassign)
	originalRoleIds
		.filter((roleId) => !selectedRoles[roleId])
		.forEach((roleId, i) => (removedRoles[`roleId${i}`] = roleId));

	if (!isEmpty(removedRoles) || !originalRoleIds.length) {
		// the API wipes everything after doing an unassign, so we'll re-assign anything that wasn't
		//   changed anyway
		selectedRoleIds.forEach((roleId, i) => (addedRoles[`roleId${i}`] = roleId));
	} else {
		selectedRoleIds
			.filter((roleId) => !values.roles?.[roleId])
			.forEach((roleId, i) => (addedRoles[`roleId${i}`] = roleId));
	}

	return { addedRoles, removedRoles };
};

export const updateRoleUsage = (roleId: string, prev: Record<string, boolean>) => {
	const rc = { ...prev };
	if (rc[roleId]) {
		delete rc[roleId];
	} else {
		Object.assign(rc, { [roleId]: true });
	}
	return rc;
};
