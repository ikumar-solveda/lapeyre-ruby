/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import useSWR, { unstable_serialize as unstableSerialize } from 'swr';
import { DEFAULT_LANGUAGE, DEFAULT_PAGE_DATA } from '@/data/config/DEFAULTS';
import { queryV2UrlResource } from 'integration/generated/query';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { ParsedUrlQuery } from 'querystring';
import { getIdFromPath } from '@/data/utils/getIdFromPath';
import { PageDataFromId } from '@/data/types/PageDataFromId';
import { getStaticRoutePageData } from '@/data/utils/getStaticRoutePageData';
import { getSettings, useSettings } from '@/data/Settings';
import { getUser, User, useUser } from '@/data/User';
import { GetServerSidePropsContext } from 'next';
import { Cache } from '@/data/types/Cache';
import Cookies from 'cookies';
import { PERSISTENT, WC_PREFIX, WCP_PREFIX } from '@/data/constants/cookie';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getCart } from '@/data/Content/_Cart';
import { Order } from '@/data/types/Order';
import { setDefaultLayoutIfNeeded } from '@/data/utils/setDefaultLayoutIfNeeded';
import { useMemo } from 'react';
import { constructPreviewTokenHeaderRequestParams } from '@/data/utils/constructRequestParams';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { normalizeStoreTokenPath } from '@/data/utils/normalizeStoreTokenPath';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';

const DATA_KEY = 'PageDataFromId';

type PageDataLookup = {
	storeId: string;
	path: ParsedUrlQuery['path'];
	localeId: string;
	user: Partial<User>;
	identifier: string;
	cart?: Order;
};

const fetcher =
	(pub: boolean) =>
	async (
		{ localeId, path, storeId, user, cart, identifier }: PageDataLookup,
		params: RequestParams
	): Promise<PageDataFromId | undefined> => {
		const staticRoutePageData = await getStaticRoutePageData({
			pub,
			path,
			localeId,
			user,
			cart,
		});
		if (typeof staticRoutePageData === 'string') {
			// if decided redirect (protected), return redirect;
			return Promise.resolve({
				...DEFAULT_PAGE_DATA,
				page: { ...DEFAULT_PAGE_DATA.page, redirect: staticRoutePageData },
			});
		}
		// else try to get from server
		try {
			const data = await queryV2UrlResource(pub).getV2CategoryResources1(
				{
					storeId,
					identifier,
				} as any,
				params
			);
			const pageData = extractContentsArray(data).at(0);
			if (pageData) {
				// if the url keyword does not have corresponding page defined at commerce server(search)
				// server respond with an empty contents array instead of 404
				return pageData;
			}
		} catch (error) {
			console.log(error);
		}
		// if there is static config fallback, use fallback
		if (staticRoutePageData && typeof staticRoutePageData === 'object') {
			return Promise.resolve(staticRoutePageData);
		} else {
			// it will result in 404 page
			return undefined;
		}
	};

export const getPageDataFromId = async (
	cache: Cache,
	path: ParsedUrlQuery['path'],
	context: GetServerSidePropsContext
) => {
	const settings = await getSettings(cache, context);
	const { storeToken } = settings;
	const identifier = getIdFromPath(path, storeToken);
	const cookie = new Cookies(context.req, context.res);
	const inPreview = settings.inPreview;
	const user = await getUser(cache, context);
	if (user?.sessionError) {
		// This code should NEVER be executed(except for initial page load request),
		// since we will not fetch page props if user session error happened.
		// see pages/[...path].tsx#L49-L50
		// and `docs/cookie-session.md`
		// delete session related cookie on session error
		const cookieKeys = Object.keys(context.req.cookies);
		cookieKeys.forEach((name) => {
			if (inPreview) {
				if (name.startsWith(WCP_PREFIX)) {
					// delete cookie in the response, persistent cookie is useful for remember me case, so keep it
					cookie.set(name, null, { overwrite: true });
				}
			} else if (name.startsWith(WC_PREFIX) && name !== PERSISTENT) {
				// delete cookie in the response, persistent cookie is useful for remember me case, so keep it
				cookie.set(name, null, { overwrite: true });
			}
		});
	}

	const cart = await getCart({ cache, context, id: '' });
	const { storeId, langId } = getServerSideCommon(settings, context);
	const props = {
		storeId,
		path: normalizeStoreTokenPath({ path, storeUrlKeyword: storeToken?.urlKeywordName }),
		identifier,
		localeId: langId || DEFAULT_LANGUAGE,
		user: { isLoggedIn: !!user?.isLoggedIn, sessionError: !!user?.sessionError },
	};
	const params = constructPreviewTokenHeaderRequestParams({ context });
	const key = unstableSerialize([props, DATA_KEY]);
	const value = cache.get(key) || fetcher(false)({ ...props, cart }, params);
	cache.set(key, value);
	return setDefaultLayoutIfNeeded(await value) as PageDataFromId;
};

export const usePageDataFromId = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, storeToken, langId } = getClientSideCommon(settings, router);
	const { user } = useUser();
	const {
		query: { path },
	} = router;
	const { storeToken: { urlKeywordName = '' } = {} } = settings;
	const iPath = useMemo(
		() => normalizeStoreTokenPath({ path, storeUrlKeyword: urlKeywordName }),
		[urlKeywordName, path]
	);
	const params = useExtraRequestParameters();
	const {
		data: _data,
		error,
		isLoading,
	} = useSWR(
		[
			{
				storeId,
				path: iPath,
				identifier: getIdFromPath(path, storeToken),
				localeId: langId || DEFAULT_LANGUAGE,
				user: { isLoggedIn: !!user?.isLoggedIn, sessionError: !!user?.sessionError },
			},
			DATA_KEY,
		],
		async ([props]) => fetcher(true)(props, params),
		{
			revalidateOnFocus: false,
		}
	);
	const data = useMemo(() => (_data ? setDefaultLayoutIfNeeded(_data) : _data), [_data]);
	return {
		data,
		loading: isLoading,
		error,
	};
};
