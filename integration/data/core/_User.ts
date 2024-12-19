/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { logoutFetcher } from '@/data/Content/_Logout';
import { userRolesDetailsFetcher } from '@/data/Content/_Person';
import { contextFetcher } from '@/data/_UserContext';
import { ERROR_TYPE } from '@/data/constants/errors';
import { GENERIC_USER_ID } from '@/data/constants/user';
import { BUYER_ADMIN_ROLE, BUYER_APPROVER_ROLE } from '@/data/constants/userRoles';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { ErrorType } from '@/data/types/Error';
import { RolesWithDetails } from '@/data/types/Person';
import { UserContext } from '@/data/types/UserContext';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { processError } from '@/data/utils/processError';
import type {
	PersonPerson,
	PersonPersonContextAttribute,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsPerson from 'integration/generated/transactions/transactionsPerson';
import { GetServerSidePropsContext } from 'next';

export type User = {
	isLoggedIn?: boolean;
	personalizationId?: string;
	userId?: string;
	storeId?: string;
	globalization?: object;
	entitlement?: object;
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	sessionError?: boolean;
	logonId?: string;
	context?: UserContext;
	rolesWithDetails?: RolesWithDetails[];
	buyerAdmin?: boolean;
	buyerApprover?: boolean;
	isGeneric?: boolean;
	contextAttribute?: PersonPersonContextAttribute[];
	forCDNCache?: boolean;
};

const dataMapContext = (data: UserContext): User => {
	const userData = {
		isLoggedIn: data.basicInfo?.registerType === 'G' ? false : true,
		personalizationId: data.audit?.personalizationId ?? '',
		userId: data.basicInfo?.runAsId?.toString(),
		storeId: data.basicInfo?.storeId?.toString(),
		globalization: { ...data.globalization },
		entitlement: { ...data.entitlement },
		context: data,
	};
	return userData;
};

const dataMapPerson = (data: PersonPerson): User => {
	const userData = {
		firstName: data.firstName ?? '',
		lastName: data.lastName ?? '',
		email: data.email1 ?? '',
		phone: data.phone1 ?? '',
		logonId: data.logonId ?? '',
		contextAttribute: data.contextAttribute ?? [],
		...(data.logonId && {
			userId: data.userId ?? '',
		}),
	};
	return userData;
};

export const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		langId,
		params = {},
	}: {
		storeId: string;
		params?: RequestParams;
		langId?: string;
	}) => {
		try {
			const personData = await transactionsPerson(pub)
				.personFindPersonBySelf(storeId, { langId } as any, params)
				.catch((error) => {
					const err = processError(error as TransactionErrorResponse) as ErrorType;
					if (err.messageKey === 'PartialAuthError') {
						return transactionsPerson(pub).personFindPersonNameBySelf(
							storeId,
							{ langId } as any,
							params
						);
					} else {
						throw error;
					}
				});
			const contextData = await contextFetcher(pub)({ storeId, params });
			let data: User = { ...dataMapContext(contextData), ...dataMapPerson(personData) };
			data.isGeneric = !data.userId || String(data.userId) === GENERIC_USER_ID;
			if (data.isLoggedIn && !data.context?.isPartiallyAuthenticated) {
				const { userId } = data;
				const rolesWithDetails = await userRolesDetailsFetcher(pub, undefined, context)(
					storeId,
					userId as string,
					params,
					{ langId }
				);
				data = {
					...data,
					rolesWithDetails: rolesWithDetails?.rolesWithDetails,
					buyerAdmin: rolesWithDetails?.rolesWithDetails?.some(
						(n) => n?.roleId === BUYER_ADMIN_ROLE
					),
					buyerApprover: rolesWithDetails?.rolesWithDetails?.some(
						(n) => n?.roleId === BUYER_APPROVER_ROLE
					),
				};
			}
			return data;
		} catch (error) {
			errorWithId(getRequestId(context), '_User: fetcher: error', { error });
			if (pub) {
				throw error;
			} else {
				/**
				 * this is most likely a very first call to validate use session on each server request
				 * identify session error here and to be handled by protectRoute logic downstream in
				 * integration/data/core/utils/getStaticRoutePageData.ts
				 */
				const err = processError(error as TransactionErrorResponse);
				if (err.type === ERROR_TYPE.session) {
					logoutFetcher(false)(storeId, { updateCookies: 'true' }, params);
					return { sessionError: true };
				}
				return undefined;
			}
		}
	};
