/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { RolesToAssignDetailsResponse } from '@/data/types/Organization';
import { error } from '@/data/utils/loggerUtil';
import { transactionsOrganization } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';

export type RolesInOrgCanAssignQuery = {
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
};

export const rolesDataMap = (roleResponse?: RolesToAssignDetailsResponse) =>
	roleResponse?.roleDataBeans ?? [];

export const rolesICanAssignInOrgFetcher =
	(pub: boolean, throwError = false, context?: GetServerSidePropsContext) =>
	async (storeId: string, query: RolesInOrgCanAssignQuery, params: RequestParams = {}) => {
		try {
			return await (transactionsOrganization(pub).organizationFindByQuery(
				storeId,
				{ profileName: 'IBM_Roles_To_Assign_Details', q: 'rolesICanAssignInOrg', ...query },
				params
				// the spec is not accurate.
			) as Promise<unknown> as Promise<RolesToAssignDetailsResponse>);
		} catch (e) {
			if (pub) {
				throw e;
			} else {
				error(
					context?.req,
					'_Admin_RolesICanAssignInOrgFetcher: rolesICanAssignInOrgFetcher: error o%',
					e
				);
				if (throwError) {
					throw e;
				}
				return undefined;
			}
		}
	};
