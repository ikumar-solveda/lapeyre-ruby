/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { categoryFetcher } from '@/data/Content/_CategoryFetcher';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { getLocalization } from '@/data/Localization';
import { getSettings, Settings } from '@/data/Settings';
import { ID } from '@/data/types/Basic';
import { Cache, CacheScope } from '@/data/types/Cache';
import { CategoryType } from '@/data/types/Category';
import { UserContext } from '@/data/types/UserContext';
import { getUser } from '@/data/User';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getContractIdParamFromContext } from '@/data/utils/getContractIdParamFromContext';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { getStoreLocaleFromSettingsAndNextLocale } from '@/data/utils/getStoreLocaleFromSettingsAndNextLocale';
import { shrink } from '@/data/utils/keyUtil';
import { GetServerSidePropsContext } from 'next';
import { unstable_serialize as unstableSerialize } from 'swr';

export const DATA_KEY = 'Category';
export { categoryFetcher as fetcher };

/**
 * Invoke category API based on input lookup parameters
 * @param cache
 * @param lookupParams
 * @param context
 * @returns
 */
export const getCategoryExtended = async (
	cache: Cache,
	lookupParams: Record<string, ID | ID[]>,
	context: GetServerSidePropsContext
) => {
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const { localeName: locale } = await getStoreLocale({ cache, context });
	const routes = await getLocalization(cache, locale, 'Routes');
	const key = getCategoryCacheKey(lookupParams, settings, user.context);
	const query = getCategoryFetchPayload(lookupParams, settings, user.context, {
		nextLocale: locale,
	});
	const params = constructRequestParamsWithPreviewToken({ context, settings, routes });
	const cacheScope = getServerCacheScope(context, user.context);
	const value = cache.get(key, cacheScope) ?? categoryFetcher(false, context)(query, params);
	cache.set(key, value, cacheScope);
	return (await value) as CategoryType[] | undefined;
};

/**
 * Fetching one category
 * @param cache
 * @param id
 * @returns
 */
export const getCategory = async (cache: Cache, id: ID, context: GetServerSidePropsContext) => {
	const value = await getCategoryExtended(cache, { id }, context);
	return value?.at(0);
};

export const parseChildCategoryId = (category: CategoryType | undefined) =>
	category?.links?.children
		?.map((childLink: string) => childLink.split('&').at(-1)?.split('=').at(-1) ?? '')
		.filter(Boolean) ?? [];

/**
 * Cache and put category by id query into SWR fallback
 * @param map C
 * @param categories
 * @returns
 */
export const cacheCategories = (
	cache: Cache,
	categories: CategoryType[] | undefined,
	settings: Settings,
	userContext: UserContext | undefined,
	cacheScope?: CacheScope
) => {
	const recursively = [...(categories ?? [])];

	// we want to avoid blowing up the stack, so we iterate instead of recursing
	//   note: this still doesn't necessarily prevent a heap blowup
	// eslint-disable-next-line functional/no-loop-statement
	for (const category of recursively) {
		const key = getCategoryCacheKey({ id: category.uniqueID }, settings, userContext);
		cache.setPersistentOnly(key, Promise.resolve([category]), cacheScope);
		if (category.children?.length) {
			recursively.push(...category.children);
		}
	}
};

type ExtraProps = { nextLocale?: string };
export const getCategoryFetchPayload = (
	params: Record<string, ID | ID[]>,
	settings: Settings,
	userCtx: UserContext | undefined,
	extra?: ExtraProps
) => ({
	storeId: settings.storeId,
	...params,
	...getContractIdParamFromContext(userCtx),
	...getCurrencyParamFromContext(userCtx),
	langId: getStoreLocaleFromSettingsAndNextLocale({ settings, nextLocale: extra?.nextLocale })
		.languageId,
});

const getCategoryCacheKey = (
	params: Record<string, ID | ID[]>,
	settings: Settings,
	userCtx: UserContext | undefined,
	extra?: ExtraProps
) =>
	unstableSerialize([shrink(getCategoryFetchPayload(params, settings, userCtx, extra)), DATA_KEY]);
