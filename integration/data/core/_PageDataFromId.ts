/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getCart } from '@/data/Content/_Cart';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { URLsFetcher } from '@/data/Content/_URLs';
import { Settings, getSettings, isB2BStore, useSettings } from '@/data/Settings';
import { User, getUser, useUser } from '@/data/User';
import { DEFAULT_LANGUAGE, DEFAULT_PAGE_DATA } from '@/data/config/DEFAULTS';
import { PERSISTENT, WCP_PREFIX, WC_PREFIX } from '@/data/constants/cookie';
import { Cache } from '@/data/types/Cache';
import { Order } from '@/data/types/Order';
import { PageDataFromId } from '@/data/types/PageDataFromId';
import { Token } from '@/data/types/Token';
import { constructPreviewTokenHeaderRequestParams } from '@/data/utils/constructRequestParams';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getIdFromPath } from '@/data/utils/getIdFromPath';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { getStaticRoutePageData } from '@/data/utils/getStaticRoutePageData';
import { expand, shrink } from '@/data/utils/keyUtil';
import { normalizeStoreTokenPath } from '@/data/utils/normalizeStoreTokenPath';
import { setDefaultLayoutIfNeeded } from '@/data/utils/setDefaultLayoutIfNeeded';
import Cookies from 'cookies';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

const DATA_KEY = 'PageDataFromId';
const OMIT_FOR_KEY = {
	relatedStores: true,
	locationInfo: true,
	contactInfo: true,
	defaultCatalog: true,
	userData: true,
	supportedLanguages: true,
	supportedCurrencies: true,
	storeName: true,
	state: true,
	ownerId: true,
	mapApiKey: true,
	inventorySystem: true,
	currencySymbol: true,
};
type PageDataLookup = {
	storeId: string;
	path: ParsedUrlQuery['path'];
	localeId: string;
	user: Partial<User>;
	identifier: string;
	cart?: Order;
	settings?: Settings;
};

const fetcher =
	(pub: boolean) =>
	async (
		{ localeId, path, storeId, user, cart, identifier, settings }: PageDataLookup,
		params: RequestParams
	): Promise<PageDataFromId | undefined> => {
		const staticRoutePageData = await getStaticRoutePageData({
			pub,
			path,
			localeId,
			user,
			cart,
			settings,
		});
		if (typeof staticRoutePageData === 'string') {
			// if decided redirect (protected), return redirect;
			const { page, ...other } = DEFAULT_PAGE_DATA;
			return Promise.resolve({ ...other, page: { ...page, redirect: staticRoutePageData } });
		}
		// else try to get from server
		try {
			const data = await URLsFetcher(pub)(
				{
					storeId: Number(storeId),
					identifier: Array.isArray(identifier) ? identifier : [identifier],
				},
				params as any
			);
			const pageData = extractContentsArray(data).at(0);
			if (pageData) {
				// if the url keyword does not have corresponding page defined at commerce server(search)
				// server respond with an empty contents array instead of 404
				return pageData;
			}
		} catch (error) {
			// on client-side, this is a legitimate error (most likely an indicated session-error) --
			//   throw it and we can try to handle it
			if (pub) {
				throw error;
			}
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
		settings,
	};
	const params = constructPreviewTokenHeaderRequestParams({ context });
	const key = unstableSerialize([shrink(props, OMIT_FOR_KEY), DATA_KEY]);
	const cacheScope = { requestScope: false };
	const value = cache.get(key, cacheScope) || fetcher(false)({ ...props, cart }, params);
	cache.set(key, value, cacheScope);
	return setDefaultLayoutIfNeeded(await value, isB2BStore(settings)) as PageDataFromId;
};
const EMPTY_TOKEN_CONTAINER: Token = {};

export const usePageDataFromId = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, storeToken, langId } = getClientSideCommon(settings, router);
	const { user } = useUser();
	const {
		query: { path },
	} = router;
	const { storeToken: { urlKeywordName = '' } = EMPTY_TOKEN_CONTAINER } = settings;
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
			shrink(
				{
					storeId,
					path: iPath,
					identifier: getIdFromPath(path, storeToken),
					localeId: langId || DEFAULT_LANGUAGE,
					user: { isLoggedIn: !!user?.isLoggedIn, sessionError: !!user?.sessionError },
					settings,
				},
				OMIT_FOR_KEY
			),
			DATA_KEY,
		],
		async ([props]) => fetcher(true)(expand(props), params),
		{
			revalidateOnFocus: false,
		}
	);
	const data = useMemo(
		() => (_data ? setDefaultLayoutIfNeeded(_data, isB2BStore(settings)) : _data),
		[_data, settings]
	);
	return {
		data,
		loading: isLoading,
		error,
	};
};
