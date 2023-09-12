/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { cacheCategories } from '@/data/Content/_Category';
import { categoryFetcher } from '@/data/Content/_CategoryFetcher';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getLocalization, useLocalization } from '@/data/Localization';
import { getSettings, useSettings } from '@/data/Settings';
import { getUser, useUser } from '@/data/User';
import { TOP_CATEGORIES_DEPTH_LIMIT } from '@/data/config/TOP_CATEGORIES_DEPTH_LIMIT';
import { Cache } from '@/data/types/Cache';
import { CategoryType } from '@/data/types/Category';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getContractIdParamFromContext } from '@/data/utils/getContractIdParamFromContext';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { trace } from '@/data/utils/loggerUtil';
import { RequestParams } from 'integration/generated/query/http-client';
import { GetServerSidePropsContext } from 'next';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';
import { getServerCacheScope } from './utils/getServerCacheScope';

export type PageLink = {
	label: string;
	url?: string;
	children: PageLink[];
};

const DATA_KEY = 'Navigation';

const dataMap = (contents: any[]): PageLink[] =>
	contents?.map(
		({ name, seo, children }: { name: string; seo: { href: string }; children: any[] }) => ({
			label: name,
			url: seo?.href || '',
			children: dataMap(children),
		})
	) || [];

const fetcher =
	(pub: boolean) =>
	async (props: any, params: RequestParams): Promise<CategoryType[]> =>
		(await categoryFetcher(pub)(props, params)) ?? [];

export const getNavigation = async (cache: Cache, context: GetServerSidePropsContext) => {
	trace(context.req, 'getNavigation: start');

	await getLocalization(cache, context.locale || 'en-US', 'AllCategoriesExpandedMenu');
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const { storeId, langId } = getServerSideCommon(settings, context);
	const props = {
		storeId,
		depthAndLimit: TOP_CATEGORIES_DEPTH_LIMIT,
		...getContractIdParamFromContext(user.context),
		langId,
	};
	const key = unstableSerialize([shrink(props), DATA_KEY]);
	const params = constructRequestParamsWithPreviewToken({ context });
	const cacheScope = getServerCacheScope(context, user.context);
	if (cache.has(key, cacheScope)) {
		trace(context.req, 'getNavigation: end (used cache)');
		return;
	}
	const rawValue = await fetcher(false)(props, params);

	trace(context.req, 'cacheCategories: start');
	cacheCategories(cache, rawValue, settings, user.context, cacheScope);
	trace(context.req, 'cacheCategories: end');

	const value = dataMap(rawValue);
	cache.set(key, Promise.resolve(value), cacheScope);

	trace(context.req, 'getNavigation: end (filled cache)');
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
					DATA_KEY,
			  ]
			: null,
		async ([props]) => dataMap(await fetcher(true)(expand(props), params))
	);
	return {
		navigation: data && [{ label: AllCategoriesLabel.t(), children: data }, ...data],
		loading: !error && !data,
		error,
	};
};
