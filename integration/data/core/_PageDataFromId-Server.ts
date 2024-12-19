/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getFlexFlowStoreFeature } from '@/data/Content/FlexFlowStoreFeature-Server';
import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { getCart } from '@/data/Content/_Cart';
import { getSettings, isB2BStore } from '@/data/Settings-Server';
import { getUser } from '@/data/User-Server';
import { PageDataLookup, pageDataRuntimeFetcher } from '@/data/_PageDataRuntime';
import { getServerCacheScopeForProtectedRoutes } from '@/data/cache/getServerCacheScope';
import { DEFAULT_LANGUAGE, DEFAULT_PAGE_DATA } from '@/data/config/DEFAULTS';
import { PERSISTENT, WCP_PREFIX, WC_PREFIX } from '@/data/constants/cookie';
import { DATA_KEY_PAGE_DATA_FROM_ID } from '@/data/constants/dataKey';
import { dataRouteProtectionFlexFlowMap } from '@/data/containers/manifest';
import { Cache } from '@/data/types/Cache';
import { PageDataFromId } from '@/data/types/PageDataFromId';
import { constructPreviewTokenHeaderRequestParams } from '@/data/utils/constructRequestParams';
import { getIdFromPath } from '@/data/utils/getIdFromPath';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { getStaticRoutePageData } from '@/data/utils/getStaticRoutePageData';
import { getTranslationKeyFromPath } from '@/data/utils/getTranslationKeyFromPath';
import { shrink } from '@/data/utils/keyUtil';
import { normalizeStoreTokenPath } from '@/data/utils/normalizeStoreTokenPath';
import { setDefaultLayoutIfNeeded } from '@/data/utils/setDefaultLayoutIfNeeded';
import Cookies from 'cookies';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { unstable_serialize as unstableSerialize } from 'swr';

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

export const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		{
			localeId,
			locale,
			path,
			storeId,
			user,
			cart,
			identifier,
			settings,
			searchTerm,
		}: PageDataLookup,
		params: RequestParams
	): Promise<PageDataFromId | undefined> => {
		const staticRoutePageData = await getStaticRoutePageData({
			pub,
			path,
			localeId,
			locale,
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
		const runtimePageData = await pageDataRuntimeFetcher(pub, context)(
			{ storeId, identifier, searchTerm, staticRoutePageData },
			params
		);
		if (runtimePageData) {
			return runtimePageData;
		}
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
	const { localeName: locale } = await getStoreLocale({ cache, context });
	const { storeToken } = settings;
	const { searchTerm } = context.query;
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

	const isB2B = isB2BStore(settings);
	const cart = await getCart({ cache, context, id: '' });
	const havingCart = !!cart?.orderItem; // having cart
	const { storeId, langId } = getServerSideCommon(settings, context);
	const {
		buyerAdmin = false,
		buyerApprover = false,
		sessionError = false,
		isLoggedIn = false,
		isGeneric = false,
	} = user;
	const props = {
		storeId,
		path: normalizeStoreTokenPath({ path, storeUrlKeyword: storeToken?.urlKeywordName }),
		identifier,
		localeId: langId || DEFAULT_LANGUAGE,
		locale,
		...(searchTerm && { searchTerm: decodeURIComponent([searchTerm].flat().at(0) ?? '') }),
	};
	const params = constructPreviewTokenHeaderRequestParams({ context });
	const key = unstableSerialize([shrink(props, OMIT_FOR_KEY), DATA_KEY_PAGE_DATA_FROM_ID]);

	// these properties are only required at server side to protect routes,
	// once resolved and return to browser means the routes are valid.
	// and hence these should not be part of request cache key used for fallback.
	const serverScopeKey = {
		user: { buyerAdmin, buyerApprover, sessionError, isLoggedIn, isGeneric },
		isB2BStore: isB2B, // seems only isB2B is used by logic to determine page.
		cart: havingCart,
	};
	const cacheScope = getServerCacheScopeForProtectedRoutes({
		serverScopeKey,
		context,
		userContext: user.context,
	});

	const cacheValue = cache.get(key, cacheScope) as unknown as PageDataFromId | undefined;
	let value;

	if (cacheValue) {
		value = cacheValue;
	} else {
		const { localeId, path } = props;
		const { foundEntry } = await getTranslationKeyFromPath({ localeId, path, locale });
		const [route] = foundEntry;
		const id = dataRouteProtectionFlexFlowMap[route as keyof typeof dataRouteProtectionFlexFlowMap];
		const fetch = !id || (await getFlexFlowStoreFeature({ cache, id, context }))?.featureEnabled;
		if (fetch) {
			const response = await fetcher(false)({ ...props, ...serverScopeKey, settings }, params);
			value = response as unknown as PageDataFromId | undefined;
		}
	}

	if (value && !value.page?.redirect) {
		cache.set(key, value, cacheScope);
	} else {
		cache.set(key, value); // set cache to the same request only if it is redirect or undefined
	}
	return setDefaultLayoutIfNeeded(value, isB2B) as PageDataFromId;
};
