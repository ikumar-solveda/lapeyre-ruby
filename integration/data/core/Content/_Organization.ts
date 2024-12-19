/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { OrganizationResponse } from '@/data/types/Organization';
import { error as logError } from '@/data/utils/loggerUtil';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsOrganization from 'integration/generated/transactions/transactionsOrganization';
import { GetServerSidePropsContext } from 'next';

export type OrgFetcherProfileNameType =
	| 'IBM_Organization_Short_Summary'
	| 'IBM_Organization_Summary'
	| 'IBM_Organization_Details'
	| 'IBM_Org_Entity_Details'
	| 'IBM_Assigned_Roles_Details'
	| 'IBM_Parent_Assigned_Roles_Details';

export const orgFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		organizationId,
		query,
		params,
	}: {
		storeId: string;
		organizationId: string;
		query?: {
			profileName?: OrgFetcherProfileNameType;
		};
		params: RequestParams;
	}): Promise<OrganizationResponse | undefined> => {
		try {
			return await transactionsOrganization(
				pub
			).organizationFindByOrganizationIdWParentAssignedRolesDetailsProfileName(
				storeId,
				organizationId,
				query,
				params
			);
		} catch (error: any) {
			logError(context?.req, 'Organization: orgFetcher: error: %o', error);
			return undefined;
		}
	};
