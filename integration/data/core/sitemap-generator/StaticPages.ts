/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { PagesFetcherQueryType, pagesByTypeFetcher } from '@/data/Content/_Page';
import { getSettings } from '@/data/Settings-Server';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { DATA_KEY_PAGES_BY_TYPE } from '@/data/constants/dataKey';
import { ServerPageProps } from '@/data/types/AppRouter';
import { StaticPageContainer } from '@/data/types/Sitemap';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { shrink } from '@/data/utils/keyUtil';
import { unstable_serialize } from 'swr';

const dataMap = (response?: StaticPageContainer) => response?.resultList ?? [];

export const getStaticPages = async ({ cache, context }: ServerPageProps) => {
	const settings = await getSettings(cache, context);
	const params = constructRequestParamsWithPreviewToken({ context, settings });
	const { storeId } = settings;
	const props = {
		storeId,
		query: { q: 'byUrlConfigurable', urlConfigurable: true } as PagesFetcherQueryType,
	};
	const key = unstable_serialize([shrink(props as any), DATA_KEY_PAGES_BY_TYPE]);
	const cacheScope = getServerCacheScope(context);
	const value = cache.get(key, cacheScope) || pagesByTypeFetcher(false)({ ...props, params });
	cache.set(key, value, cacheScope);

	const pages = dataMap(await value);
	return pages;
};
