/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { dataMapV2, responseDataMap } from '@/data/Content/_BreadcrumbTrail';
import { productFetcher } from '@/data/Content/_Product';
import { getLocalization } from '@/data/Localization-Server';
import { getContractIdParamFromContext, getSettings } from '@/data/Settings-Server';
import { getUser } from '@/data/User-Server';
import { getPageDataFromId } from '@/data/_PageDataFromId-Server';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { BC_COOKIE, HC_PREFIX } from '@/data/constants/cookie';
import { DATA_KEY_BREADCRUMB } from '@/data/constants/dataKey';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { ProductQueryResponse, ProductType } from '@/data/types/Product';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { getCookieName } from '@/data/utils/getCookieName';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { shrink } from '@/data/utils/keyUtil';
import Cookies from 'cookies';
import { RequestParams } from 'integration/generated/query/http-client';
import { GetServerSidePropsContext } from 'next';
import { unstable_serialize as unstableSerialize } from 'swr';

// TODO: Breadcrumb has duplicated call to products endpoint on product page and PLP page,
// can be optimized with SWR to avoid extra calls.

const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	/**
	 * The breadcrumb trail data fetcher.
	 * @param props The props used for the request to build query.
	 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
	 *                                  we are using it to send cookie header.
	 * @returns breadcrumb
	 */
	async (
		props: {
			storeId: string;
			catalogId: string;
			tokenName: string;
			tokenExternalValue: string;
			tokenValue: string;
			langId: string;
		} & Record<string, ID | ID[] | boolean | undefined>,
		params: RequestParams
	): Promise<any | undefined> => {
		const { storeId, catalogId, tokenName, tokenExternalValue, langId, tokenValue, contractId } =
			props;
		let categoryId = tokenValue;
		let query;
		let product: ProductType | null;

		// if this page is for a product, first fetch the product to determine its parent category
		if (tokenName === 'ProductToken') {
			query = {
				storeId,
				catalogId,
				langId,
				partNumber: [tokenExternalValue],
				contractId,
			};
			const res = (await productFetcher(pub, context)(query, params)) as ProductQueryResponse;
			product = extractContentsArray(res)?.at(0) ?? null;
			const parentCatalogGroupID = product?.parentCatalogGroupID;
			categoryId =
				(Array.isArray(parentCatalogGroupID) ? parentCatalogGroupID.at(-1) : parentCatalogGroupID)
					?.toString()
					.split('/')
					.at(-1) || '';
		} else {
			product = null;
		}

		// fetch the category's breadcrumb using products-by-category response -- this is heavy -- we should
		// consider using an alternate profile that perhaps only fetches the breadcrumb
		query = {
			storeId,
			catalogId,
			langId,
			categoryId,
			limit: 1,
			contractId,
		};

		const { breadCrumbTrailEntryView = [] } =
			tokenName === 'CategoryToken' || tokenName === 'ProductToken'
				? ((await productFetcher(pub, context)(query, params)) as ProductQueryResponse) ?? {}
				: {};
		return [breadCrumbTrailEntryView, product];
	};

export const getBreadcrumbTrail = async ({ cache, id: _id, context }: ContentProps) => {
	const pageData = await getPageDataFromId(cache, context.query.path, context);
	const { tokenName = '', tokenValue = '', tokenExternalValue = '' } = pageData ?? {};
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const { localeName: locale } = await getStoreLocale({ cache, context });
	const routes = await getLocalization(cache, locale, 'Routes');
	const { storeId, defaultCatalogId: catalogId, langId } = getServerSideCommon(settings, context);
	const cookies = new Cookies(context.req, context.res);
	const rawTrail = cookies.get(getCookieName({ prefix: HC_PREFIX, name: BC_COOKIE, storeId }));
	const trail = rawTrail ? JSON.parse(decodeURIComponent(rawTrail)) : undefined;
	const props = {
		tokenName,
		tokenValue,
		tokenExternalValue,
		storeId,
		catalogId,
		langId,
		...getContractIdParamFromContext(user?.context),
		// for breadcrumb, we do not need currency
	};
	const cacheScope = getServerCacheScope(context, user.context);
	const key = unstableSerialize([shrink(props), DATA_KEY_BREADCRUMB]);
	const params = constructRequestParamsWithPreviewToken({ context, settings, routes });
	let data;

	const value = cache.get(key, cacheScope);
	if (value) {
		data = await value;
	} else {
		data = responseDataMap(await fetcher(false, context)(props, params));
	}
	cache.set(key, Promise.resolve(data), cacheScope);

	const rc = dataMapV2(data, trail);
	return rc;
};
