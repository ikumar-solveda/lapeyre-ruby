/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { OrgFetcherProfileNameType, orgFetcher } from '@/data/Content/_Organization';
import { ROLES_DETAILS } from '@/data/constants/userRoles';
import { OrganizationRolesDetails } from '@/data/types/Admin_OrganizationManagement';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { keyBy } from 'lodash';
import { GetServerSidePropsContext } from 'next';

export const rolesDetailsDataMap = (rolesList?: OrganizationRolesDetails) => {
	const roles = rolesList?.rolesWithDetails ?? [];
	const rolesById = keyBy(roles, 'roleId');
	return { roles, rolesById };
};

export const rolesAssignedInOrgFetcher =
	(pub = true, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		organizationId,
		params,
	}: {
		storeId: string;
		organizationId: string;
		params: RequestParams;
	}) => {
		const props = {
			storeId,
			organizationId,
			params,
			query: { profileName: ROLES_DETAILS as OrgFetcherProfileNameType },
		};
		return orgFetcher(pub, context)(props);
	};
