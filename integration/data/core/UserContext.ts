/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getSettings, useSettings } from '@/data/Settings';
import { contextFetcher } from '@/data/_UserContext';
import { Cache } from '@/data/types/Cache';
import { UserContext } from '@/data/types/UserContext';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';
export { contextFetcher };
const DATA_KEY = 'UserContext';

export const getUserContext = async (
	cache: Cache,
	context: GetServerSidePropsContext
): Promise<UserContext> => {
	const { storeId = '', defaultLanguage: langId = '' } = await getSettings(cache, context);
	const key = unstableSerialize([shrink({ storeId, langId }), DATA_KEY]);
	const params: RequestParams = constructRequestParamsWithPreviewToken({ context });
	const value = cache.get(key) ?? contextFetcher(false)({ storeId, langId, params });
	cache.set(key, value);
	return await value;
};

// in B2C, ideally we never need to call this since the context will be set server-side
//   and passed via settings or fetched by the user -- in B2B we may use this to display
//   and perform contract selection
export const useUserContext = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { data, error } = useSWR(
		storeId ? [shrink({ storeId, langId, params }), DATA_KEY] : null,
		async ([props]) => contextFetcher(true)({ ...expand(props), params })
	);
	return {
		user: data as UserContext,
		loading: !error && !data,
		error,
	};
};
