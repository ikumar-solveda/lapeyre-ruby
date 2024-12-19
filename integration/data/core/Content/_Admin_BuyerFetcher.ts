/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { BuyerResponse } from '@/data/types/Admin_BuyerManagement';
import { error } from '@/data/utils/loggerUtil';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsPerson from 'integration/generated/transactions/transactionsPerson';
import { GetServerSidePropsContext } from 'next';

type BuyerFetcherProfileNameType =
	| 'IBM_User_Display_Details'
	| 'IBM_User_Registration_Details'
	| 'IBM_User_Top_Level_Org_Administered'
	| 'IBM_Assigned_Roles_Details'
	| 'IBM_Roles_Of_User_All'
	| 'IBM_Roles_Of_User_In_Orgs_I_Can_Admin';
const DEFAULT_BUYER_FETCHER_QUERY = {
	profileName: 'IBM_User_Registration_Details' as BuyerFetcherProfileNameType,
};

export const buyerFetcher =
	(pub: boolean, _context?: GetServerSidePropsContext) =>
	async (payload: {
		storeId: string;
		userId: string;
		query?: { profileName: BuyerFetcherProfileNameType };
		params: RequestParams;
	}) => {
		const { storeId, userId, query = DEFAULT_BUYER_FETCHER_QUERY, params } = payload;
		try {
			return (await transactionsPerson(
				pub
			).personFindByUserIdWRolesOfUserInOrgsICanAdminProfileName(
				storeId,
				userId,
				query,
				params
			)) as BuyerResponse;
		} catch (e) {
			if (pub) {
				throw e;
			} else {
				error(_context?.req, '_Admin_BuyerFetcher: buyerFetcher: error: %o', error);
				return undefined;
			}
		}
	};
