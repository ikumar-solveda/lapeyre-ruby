/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	BuyerResponse,
	SelectedRole,
	SelectedRolesRecord,
} from '@/data/types/Admin_BuyerManagement';
import { RolesOfUserInOrgsICanAdminResponse } from '@/data/types/Person';
import type { ComIbmCommerceRestMemberHandlerPersonHandlerMemberRoleAssignmentRequest } from 'integration/generated/transactions/data-contracts';
import { keyBy, keys, mapValues, values } from 'lodash';

export const flatSelectedRoleData = (selectedRoles?: SelectedRolesRecord) =>
	values(selectedRoles)
		.flatMap((r) => values(r))
		.filter(Boolean);

export const mapBuyerToFormValue = (buyer?: BuyerResponse) => {
	if (!buyer) return undefined;
	const {
		addresses,
		address,
		userProfile,
		userRegistry,
		demographics,
		organizationId: parentMemberId,
		...rest
	} = buyer ?? {};
	const newAddress = mapValues(address, (value: string | null) => (null === value ? '' : value));
	return {
		...{ parentMemberId },
		...rest,
		...newAddress,
		selectedIncludeMemberGroup: '',
		selectedExcludeMemberGroup: '',
		assignedIncludeMemberGroup: '',
		assignedExcludeMemberGroup: '',
	};
};

export const mapBuyerRolesToAssignUnassign = (
	sourceRolesList: SelectedRole[] = [],
	rolesFilter: SelectedRolesRecord = {}
) =>
	sourceRolesList.filter(({ roleId, orgId }) => {
		const result = !rolesFilter[orgId] || !rolesFilter[orgId][roleId];
		return result;
	});

export const mapSelectedRolesToAssignPayload = (rolesList: SelectedRole[]) =>
	rolesList.reduce(
		(pre, role, index) => ({
			...pre,
			[`orgEntityId${index + 1}`]: role.orgId,
			[`roleId${index + 1}`]: role.roleId,
		}),
		{} as ComIbmCommerceRestMemberHandlerPersonHandlerMemberRoleAssignmentRequest
	);

export const currentSelectedRolesMap = (
	currentRolesData?: RolesOfUserInOrgsICanAdminResponse
): SelectedRolesRecord =>
	keys(currentRolesData?.orgIdRoleDataBeans).reduce((pre, orgId) => {
		const roles = currentRolesData?.orgIdRoleDataBeans[orgId];
		return {
			...pre,
			[orgId]: keyBy(
				roles?.map((role) => ({ ...role, orgId })),
				'roleId'
			),
		};
	}, {} as SelectedRolesRecord);
