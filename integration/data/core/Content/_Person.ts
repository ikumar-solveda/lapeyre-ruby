/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ROLES_DETAILS } from '@/data/constants/userRoles';
import { ID } from '@/data/types/Basic';
import { Person, RolesDetailsResponse } from '@/data/types/Person';
import { error as logError } from '@/data/utils/loggerUtil';
import { transactionsPerson } from 'integration/generated/transactions';
import { ComIbmCommerceRestMemberHandlerPersonHandlerMemberRoleAssignmentRequest } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';

export const selfFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		query: {
			[key: string]: boolean | ID | ID[];
		} = {},
		params: RequestParams
	): Promise<Person | undefined> => {
		try {
			return await transactionsPerson(pub).personFindPersonBySelf(storeId, query, params);
		} catch (e) {
			if (pub) {
				throw e;
			}
			logError(context?.req, '_Person: selfFetcher: error: %o', e);
			// currently, we do not want to break the server with error
			return undefined;
		}
	};

export const userRolesDetailsFetcher =
	(pub: boolean, throwError = false, context?: GetServerSidePropsContext) =>
	async (storeId: string, userId: string, params: RequestParams = {}, query = {}) => {
		try {
			return await (transactionsPerson(
				pub
			).personFindByUserIdWRolesOfUserInOrgsICanAdminProfileName(
				storeId,
				userId,
				{ profileName: ROLES_DETAILS, ...query },
				params
				// the spec is not accurate.
			) as Promise<unknown> as Promise<RolesDetailsResponse>);
		} catch (e) {
			if (pub) {
				throw e;
			} else {
				logError(context?.req, '_Person: userRolesDetailsFetcher: error o%', e);
				if (throwError) {
					throw e;
				}
				return undefined;
			}
		}
	};

export const selfUpdater =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: boolean | ID | ID[] | string;
		} = {},
		data: any, // the spec is wrong
		params: RequestParams
	) =>
		await transactionsPerson(pub).personUpdatePersonOnUserRegistrationUpdate(
			storeId,
			query,
			data,
			params
		);

export const roleUpdater =
	(pub: boolean) =>
	async (
		storeId: string,
		userId: string,
		query: { action: 'assignRole' | 'unassignRole' },
		data: ComIbmCommerceRestMemberHandlerPersonHandlerMemberRoleAssignmentRequest,
		params: RequestParams
	) =>
		await transactionsPerson(pub).personPerformActionByAdmin(storeId, userId, query, data, params);
