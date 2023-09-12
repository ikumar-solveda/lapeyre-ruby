/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { logoutFetcher } from '@/data/Content/Logout';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getSettings, useSettings } from '@/data/Settings';
import { contextFetcher } from '@/data/UserContext';
import { DATA_KEY_USER } from '@/data/constants/dataKey';
import { ERROR_TYPE } from '@/data/constants/errors';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { Cache } from '@/data/types/Cache';
import { UserContext } from '@/data/types/UserContext';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { logger } from '@/logging/logger';
import { processError } from '@/data/utils/processError';
import { RequestParams } from 'integration/generated/query/http-client';
import { transactionsPerson } from 'integration/generated/transactions';
import { PersonPerson } from 'integration/generated/transactions/data-contracts';
import { GetServerSidePropsContext } from 'next';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

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
	sessionError?: boolean;
	logonId?: string;
	context?: UserContext;
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
		logonId: data.logonId ?? '',
	};
	return userData;
};

const fetcher =
	(pub: boolean) =>
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
			const contextData = await contextFetcher(pub)({ storeId, langId, params });
			let data = dataMapContext(contextData);
			if (data.isLoggedIn) {
				const personData = await transactionsPerson(pub).personFindPersonBySelf(
					storeId,
					{ langId } as any,
					params
				);
				data = { ...data, ...dataMapPerson(personData) };
			}
			return data;
		} catch (error) {
			if (pub) {
				throw error;
			} else {
				logger.error('User: fetcher: error: %o', error);

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

export const getUser = async (cache: Cache, context: GetServerSidePropsContext): Promise<User> => {
	const settings = await getSettings(cache, context);
	const { storeId, langId } = getServerSideCommon(settings, context);
	const params: RequestParams = constructRequestParamsWithPreviewToken({ context });
	const props = { storeId, langId };
	const key = unstableSerialize([shrink(props), DATA_KEY_USER]);
	const value = cache.get(key) ?? fetcher(false)({ storeId, langId, params });

	cache.set(key, value);
	return await value;
};

export const useUser = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	// TODO: param to be part of key for site level cache(redis?)
	// server-side param has cookie, client does not. need to separate cookie and preview header.
	const params = useExtraRequestParameters();
	const { data, mutate, error } = useSWR(
		storeId ? [shrink({ storeId, langId }), DATA_KEY_USER] : null,
		async ([props]) => fetcher(true)({ ...expand(props), params })
	);
	return {
		user: data,
		mutateUser: mutate,
		loading: !error && !data,
		error,
	};
};
