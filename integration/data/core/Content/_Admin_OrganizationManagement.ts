/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import {
	OrganizationManagementFetchRequest,
	OrganizationManagementResponse,
} from '@/data/types/Admin_OrganizationManagement';
import { error as logError } from '@/data/utils/loggerUtil';
import { transactionsOrganization } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';

/**
 * fetch the result of organizations for buyer admin user
 * @param pub
 * @returns
 */
export const organizationManagementFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		query: OrganizationManagementFetchRequest,
		params: RequestParams
	): Promise<OrganizationManagementResponse | undefined> => {
		try {
			return (await transactionsOrganization(pub).organizationFindByQuery(
				storeId,
				query,
				params
			)) as OrganizationManagementResponse;
		} catch (e: any) {
			logError(context?.req, '_OrganizationManagement: fetcher: error: %o', e);
			if (pub) {
				throw e;
			} else {
				return undefined;
			}
		}
	};
