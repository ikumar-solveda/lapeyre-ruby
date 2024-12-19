/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */
import { USER_REGISTRATION_DETAILS_PROFILE_NAME } from '@/data/constants/admin_approvalsManagement';
import { UserRegistrationDetailsResponse } from '@/data/types/Person';
import { error } from '@/data/utils/loggerUtil';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsPerson from 'integration/generated/transactions/transactionsPerson';
import { GetServerSidePropsContext } from 'next';

export const userRegistrationDetailsFetcher =
	(pub: boolean, throwError = false, context?: GetServerSidePropsContext) =>
	async (storeId: string, userId: string, params: RequestParams = {}) => {
		try {
			return await (transactionsPerson(
				pub
			).personFindByUserIdWRolesOfUserInOrgsICanAdminProfileName(
				storeId,
				userId,
				{ profileName: USER_REGISTRATION_DETAILS_PROFILE_NAME },
				params
				// the spec is not accurate.
			) as Promise<unknown> as Promise<UserRegistrationDetailsResponse>);
		} catch (e) {
			if (pub) {
				throw e;
			} else {
				error(
					context?.req,
					'_Admin_UserRegistrationDetailsFetcher: userRegistrationDetailsFetcher: error o%',
					e
				);
				if (throwError) {
					throw e;
				}
				return undefined;
			}
		}
	};
