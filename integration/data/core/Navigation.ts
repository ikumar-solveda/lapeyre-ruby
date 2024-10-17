/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { cacheCategories } from '@/data/Content/_Category';
import { categoryFetcher } from '@/data/Content/_CategoryFetcher';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getLocalization, useLocalization } from '@/data/Localization';
import { getSettings, useSettings } from '@/data/Settings';
import { getUser, useUser } from '@/data/User';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { TOP_CATEGORIES_DEPTH_LIMIT } from '@/data/config/TOP_CATEGORIES_DEPTH_LIMIT';
import { DATA_KEY_NAVIGATION } from '@/data/constants/dataKey';
import { Cache } from '@/data/types/Cache';
import { CategoryType } from '@/data/types/Category';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getContractIdParamFromContext } from '@/data/utils/getContractIdParamFromContext';
import { getRequestId } from '@/data/utils/getRequestId';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { laggyMiddleWare } from '@/data/utils/laggyMiddleWare';
import { traceWithId } from '@/data/utils/loggerUtil';
import { RequestParams } from 'integration/generated/query/http-client';
import { GetServerSidePropsContext } from 'next';
import { useMemo } from 'react';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

export type PageLink = {
	label: string;
	url?: string;
	children: PageLink[];
	trail?: string[];
};

const dataMap = (contents: any[], trail: string[] = []): PageLink[] =>
	contents?.map(
		({
			name,
			seo,
			children,
			uniqueID,
		}: {
			uniqueID: string;
			name: string;
			seo: { href: string };
			children: any[];
		}) => ({
			label: name,
			url: seo?.href || '',
			children: dataMap(children, [...trail, uniqueID, name, seo.href]),
			trail,
		})
	) || [];

const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (props: any, params: RequestParams): Promise<CategoryType[]> =>
		(await categoryFetcher(pub, context)(props, params)) ?? [];

export const getNavigation = async (cache: Cache, context: GetServerSidePropsContext) => {
	traceWithId(getRequestId(context), 'getNavigation: start');
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const { localeName: locale } = await getStoreLocale({ cache, context });
	await getLocalization(cache, locale, 'AllCategoriesExpandedMenu');
	const routes = await getLocalization(cache, locale, 'Routes');
	const { storeId, langId } = getServerSideCommon(settings, context);
	const props = {
		storeId,
		depthAndLimit: TOP_CATEGORIES_DEPTH_LIMIT,
		...getContractIdParamFromContext(user.context),
		langId,
	};
	const key = unstableSerialize([shrink(props), DATA_KEY_NAVIGATION]);
	const params = constructRequestParamsWithPreviewToken({ context, settings, routes });
	const cacheScope = getServerCacheScope(context, user.context);
	const cacheValue = await cache.get(key, cacheScope);
	if (cacheValue) {
		cache.set(key, Promise.resolve(cacheValue), cacheScope); // set to request scope fallback data
		traceWithId(getRequestId(context), 'getNavigation: end (used cache)');
		return;
	}
	const rawValue = await fetcher(false, context)(props, params);

	traceWithId(getRequestId(context), 'cacheCategories: start');
	cacheCategories(cache, rawValue, settings, user.context, cacheScope);
	traceWithId(getRequestId(context), 'cacheCategories: end');

	const value = dataMap(rawValue);
	cache.set(key, Promise.resolve(value), cacheScope);

	traceWithId(getRequestId(context), 'getNavigation: end (filled cache)');
};

export const useNavigation = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const { AllCategoriesLabel } = useLocalization('AllCategoriesExpandedMenu');
	const { user } = useUser();
	const params = useExtraRequestParameters();
	const { data, error } = useSWR(
		storeId
			? [
					shrink({
						storeId,
						depthAndLimit: TOP_CATEGORIES_DEPTH_LIMIT,
						...getContractIdParamFromContext(user?.context),
						langId,
					}),
					DATA_KEY_NAVIGATION,
			  ]
			: null,
		async ([props]) => dataMap(await fetcher(true)(expand(props), params)),
		{ use: [laggyMiddleWare] }
	);
	const navigation = useMemo(
		() => [{ label: AllCategoriesLabel.t(), children: data }, ...(data ? data : [])] as PageLink[],
		[AllCategoriesLabel, data]
	);
	return {
		navigation,
		loading: !error && !data,
		error,
	};
};
