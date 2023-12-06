/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { productFetcher } from '@/data/Content/_Product';
import { getContractIdParamFromContext, getSettings, useSettings } from '@/data/Settings';
import { getUser, useUser } from '@/data/User';
import { getPageDataFromId, usePageDataFromId } from '@/data/_PageDataFromId';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { ID } from '@/data/types/Basic';
import { Breadcrumb, HCLBreadcrumb } from '@/data/types/Breadcrumb';
import { ContentProps } from '@/data/types/ContentProps';
import { ProductQueryResponse, ProductType } from '@/data/types/Product';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { RequestParams } from 'integration/generated/query/http-client';
import { isNil, omitBy } from 'lodash';
import { GetServerSidePropsContext } from 'next';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

const DATA_KEY = 'Breadcrumb';

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

const dataMap = (data: Array<HCLBreadcrumb[] | ProductType>): Breadcrumb[] => {
	let breadcrumbs: HCLBreadcrumb[];

	if (data?.length) {
		const breadcrumb = data[0] as HCLBreadcrumb[];
		const product = data[1] as ProductType;
		breadcrumbs = [...breadcrumb];
		if (product) {
			breadcrumbs.push({ label: product.name, value: product.id, type: 'PRODUCT' });
		}
	} else {
		breadcrumbs = [];
	}

	return breadcrumbs.map(
		({ label, value, seo, type }) =>
			omitBy({ label, value, type, href: seo?.href }, isNil) as unknown as HCLBreadcrumb
	);
};

export const getBreadcrumbTrail = async ({ cache, id: _id, context }: ContentProps) => {
	const pageData = await getPageDataFromId(cache, context.query.path, context);
	const { tokenName = '', tokenValue = '', tokenExternalValue = '' } = pageData ?? {};
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const { storeId, defaultCatalogId: catalogId, langId } = getServerSideCommon(settings, context);
	const props = {
		tokenName,
		tokenValue,
		tokenExternalValue,
		storeId,
		catalogId,
		langId,
		...getContractIdParamFromContext(user?.context),
	};
	const cacheScope = getServerCacheScope(context, user.context);
	const key = unstableSerialize([shrink(props), DATA_KEY]);
	const params = constructRequestParamsWithPreviewToken({ context });
	let rc;

	const value = cache.get(key, cacheScope);
	if (value) {
		rc = await value;
	} else {
		rc = dataMap(await fetcher(false, context)(props, params));
		cache.set(key, Promise.resolve(rc), cacheScope);
	}

	return rc;
};

export const useBreadcrumbTrail = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { user } = useUser();
	const { storeId, langId, defaultCatalogId: catalogId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { data: pageData } = usePageDataFromId();
	const { tokenName = '', tokenValue = '', tokenExternalValue = '' } = pageData ?? {};
	const { data, error } = useSWR(
		tokenName && storeId
			? [
					shrink({
						tokenName,
						tokenValue,
						tokenExternalValue,
						storeId,
						catalogId,
						langId,
						...getContractIdParamFromContext(user?.context),
					}),
					DATA_KEY,
			  ]
			: null,
		async ([props]) => dataMap(await fetcher(true)(expand(props), params))
	);
	return { breadcrumb: data, uniqueId: tokenValue, error };
};
