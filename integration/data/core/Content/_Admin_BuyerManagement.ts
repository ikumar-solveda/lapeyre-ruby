/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { BuyersFetchRequest } from '@/data/types/Admin_BuyerManagement';
import { error as logError } from '@/data/utils/loggerUtil';
import { transactionsOrganization, transactionsPerson } from 'integration/generated/transactions';
import { ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetails } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';

export const buyersFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		query: BuyersFetchRequest,
		params: RequestParams
	): Promise<ComIbmCommerceUserBeansUserSearchDataBeanIBMUserListDetails | undefined> => {
		try {
			return await transactionsPerson(pub).personFindByQuery(
				storeId,
				{
					q: 'usersICanAdmin',
					profileName: 'HCL_User_List_For_Admin',
					...(query as any),
				},
				params
			);
		} catch (error: any) {
			logError(context?.req, '_BuyerManagement : fetcher: error: %o', error);
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};

export const personUpdateByAdmin =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		{ storeId, status, userId }: { storeId: string; status: string; userId: string },
		params: RequestParams
	) => {
		try {
			await transactionsPerson(true).personUpdatePersonByAdmin(
				storeId,
				userId,
				{
					userStatus: status,
				},
				params
			);
		} catch (e) {
			if (pub) {
				logError(context?.req, 'Error in updating user status %o', e);
				throw e;
			}
			// currently, we do not want to break the server with error
			return undefined;
		}
	};

export const orgRolesFetcher =
	(pub: boolean, _context?: GetServerSidePropsContext) =>
	async (storeId: string, organizationId: string, params: RequestParams) => {
		try {
			return await transactionsOrganization(
				pub
			).organizationFindByOrganizationIdWParentAssignedRolesDetailsProfileName(
				storeId,
				organizationId,
				{ profileName: 'IBM_Parent_Assigned_Roles_Details' },
				params
			);
		} catch (e) {
			if (pub) {
				throw e;
			} else {
				return undefined;
			}
		}
	};

/**
 * Reset password for user
 */
export const passwordResetter =
	(pub: boolean) =>
	async ({ storeId, logonId }: { storeId: string; logonId: string }, params: RequestParams = {}) =>
		await transactionsPerson(pub).personResetPasswordByAdmin(
			storeId,
			{ mode: 'resetPasswordAdmin' },
			{ logonId },
			params
		);
