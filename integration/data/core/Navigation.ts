/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getSettings, useSettings } from '@/data/Settings';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';
import { TOP_CATEGORIES_DEPTH_LIMIT } from '@/data/config/TOP_CATEGORIES_DEPTH_LIMIT';
import { queryV2CategoryResource } from 'integration/generated/query';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { CategoryType } from '@/data/types/Category';
import { GetServerSidePropsContext } from 'next';
import { RequestParams } from 'integration/generated/query/http-client';
import { Cache } from '@/data/types/Cache';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { getContractIdParamFromContext } from '@/data/utils/getContractIdParamFromContext';
import { getUser, useUser } from '@/data/User';
import { cacheCategories } from '@/data/Content/_Category';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';

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
	async (props: any, params: RequestParams): Promise<CategoryType[]> => {
		try {
			const data = await queryV2CategoryResource(pub).getV2CategoryResources(props, params);
			return extractContentsArray(data);
		} catch (error) {
			console.log(error);
			return [];
		}
	};

export const getNavigation = async (cache: Cache, context: GetServerSidePropsContext) => {
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const { storeId, langId } = getServerSideCommon(settings, context);
	const props = {
		storeId,
		depthAndLimit: TOP_CATEGORIES_DEPTH_LIMIT,
		...getContractIdParamFromContext(user.context),
		langId,
	};
	const key = unstableSerialize([props, DATA_KEY]);
	const params = constructRequestParamsWithPreviewToken({ context });
	if (cache.has(key)) {
		return;
	}
	const rawValue = await fetcher(false)(props, params);
	cacheCategories(cache, rawValue, settings, user.context);
	const value = dataMap(rawValue);
	cache.set(key, Promise.resolve(value));
};

export const useNavigation = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId } = getClientSideCommon(settings, router);

	const { user } = useUser();
	const params = useExtraRequestParameters();
	const { data, error } = useSWR(
		storeId
			? [
					{
						storeId,
						depthAndLimit: TOP_CATEGORIES_DEPTH_LIMIT,
						...getContractIdParamFromContext(user?.context),
						langId,
					},
					DATA_KEY,
			  ]
			: null,
		async ([props]) => dataMap(await fetcher(true)(props, params))
	);
	return {
		navigation: data && [{ label: 'All Categories', children: data }, ...data],
		loading: !error && !data,
		error,
	};
};
