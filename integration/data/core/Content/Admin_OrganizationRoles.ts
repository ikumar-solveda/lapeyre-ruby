/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	RolesInOrgCanAssignQuery,
	rolesICanAssignInOrgFetcher,
} from '@/data/Content/_Admin_RolesICanAssignInOrgFetcher';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_ORGANIZATION_ASSIGNABLE_ROLES } from '@/data/constants/dataKey';
import { RoleSearchDataBeanIBMOrganizationListDetails } from '@/data/types/Organization';
import { useMemo } from 'react';
import useSWR from 'swr';

const rolesMap = (roleResponse?: RoleSearchDataBeanIBMOrganizationListDetails) =>
	roleResponse?.roleDataBeans ?? [];

export const useAdmin_OrganizationRoles = (orgId = '') => {
	const params = useExtraRequestParameters();
	const { settings } = useSettings();
	const storeId = settings?.storeId as string;

	const { data: rolesData } = useSWR(
		storeId && orgId ? [{ storeId, orgId }, DATA_KEY_ORGANIZATION_ASSIGNABLE_ROLES] : null,
		async ([{ storeId, orgId }]) =>
			rolesICanAssignInOrgFetcher(true)(storeId, { orgId } as RolesInOrgCanAssignQuery, params),
		{ revalidateOnMount: true }
	);

	const roles = useMemo(() => rolesMap(rolesData), [rolesData]);

	return {
		roles,
	};
};
