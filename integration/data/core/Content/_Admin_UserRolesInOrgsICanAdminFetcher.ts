/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { RolesOfUserInOrgsICanAdminResponse } from '@/data/types/Person';
import { error } from '@/data/utils/loggerUtil';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsPerson from 'integration/generated/transactions/transactionsPerson';
import { GetServerSidePropsContext } from 'next';

const ROLES_IN_ORGS_I_CAN_ADMIN_PROFILE = 'IBM_Roles_Of_User_In_Orgs_I_Can_Admin';

/**
 * Assigned roles for the user with `userId` that the admin can manage.
 * @param pub
 * @param throwError
 * @param context
 * @returns
 */
export const userRolesInOrgsICanAdminFetcher =
	(pub: boolean, throwError = false, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		userId,
		params = {},
		query = {},
	}: {
		storeId: string;
		userId: string;
		params?: RequestParams;
		query?: any;
	}) => {
		try {
			return await (transactionsPerson(
				pub
			).personFindByUserIdWRolesOfUserInOrgsICanAdminProfileName(
				storeId,
				userId,
				{ profileName: ROLES_IN_ORGS_I_CAN_ADMIN_PROFILE, ...query },
				params
				// the spec is not accurate.
			) as Promise<unknown> as Promise<RolesOfUserInOrgsICanAdminResponse>);
		} catch (e) {
			if (pub) {
				throw e;
			} else {
				error(
					context?.req,
					'_Admin_UserRolesInOrgsICanAdminFetcher: userRolesInOrgsICanAdminFetcher: error o%',
					e
				);
				if (throwError) {
					throw e;
				}
				return undefined;
			}
		}
	};
