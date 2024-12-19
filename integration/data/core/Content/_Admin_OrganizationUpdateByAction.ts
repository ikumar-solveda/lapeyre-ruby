/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */
import { RoleAndApprovalGroupsType } from '@/data/types/Admin_OrganizationManagement';
import { error as logError } from '@/data/utils/loggerUtil';
import type { ComIbmCommerceRestMemberHandlerOrganizationHandlerUpdateApprovalGroups } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsOrganization from 'integration/generated/transactions/transactionsOrganization';
import { GetServerSidePropsContext } from 'next';

export const organizationUpdateByAction =
	(pub = true, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		organizationId,
		query,
		data,
		params,
	}: {
		storeId: string;
		organizationId: string;
		query: { action: RoleAndApprovalGroupsType };
		data: Record<string, string>;
		params: RequestParams;
	}) => {
		try {
			return await transactionsOrganization(pub).organizationUpdateApprovalGroups(
				storeId,
				organizationId,
				query,
				{
					...data,
					URL: '-',
				} as ComIbmCommerceRestMemberHandlerOrganizationHandlerUpdateApprovalGroups,
				params
			);
		} catch (error) {
			logError(
				context?.req,
				'_Admin_OrganizationUpdateByAction: organizationUpdateByAction: error: %o',
				error
			);
			throw error;
		}
	};
