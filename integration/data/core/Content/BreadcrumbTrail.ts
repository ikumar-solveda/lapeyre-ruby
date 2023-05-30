/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import useSWR, { unstable_serialize as unstableSerialize } from 'swr';
import { getSettings, useSettings } from '@/data/Settings';
import { ContentProps } from '@/data/types/ContentProps';
import { ProductQueryResponse, ProductType } from '@/data/types/Product';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { queryV2ProductResource } from 'integration/generated/query';
import { useMemo } from 'react';
import { Breadcrumb, HCLBreadcrumb } from '@/data/types/Breadcrumb';
import { getPageDataFromId, usePageDataFromId } from '@/data/_PageDataFromId';
import { RequestParams } from 'integration/generated/query/http-client';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';

const DATA_KEY = 'Breadcrumb';

// TODO: Breadcrumb has duplicated call to products endpoint on product page and PLP page,
// can be optimized with SWR to avoid extra calls.

const fetcher =
	(pub: boolean) =>
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
		},
		params: RequestParams
	): Promise<any | undefined> => {
		const { storeId, catalogId, tokenName, tokenExternalValue, langId, tokenValue } = props;

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
			};
			const res = (await queryV2ProductResource(pub).findProducts(
				query,
				params
			)) as ProductQueryResponse;
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
		//   consider using an alternate profile that perhaps only fetches the breadcrumb
		query = {
			storeId,
			catalogId,
			langId,
			categoryId,
			limit: 1,
		};

		const res = (await queryV2ProductResource(pub).findProducts(
			query,
			params
		)) as ProductQueryResponse;
		const { breadCrumbTrailEntryView = [] } = res;
		return [breadCrumbTrailEntryView, product];
	};

const dataMap = (data: Array<HCLBreadcrumb[] | ProductType>): Breadcrumb[] => {
	const breadcrumb = data[0] as HCLBreadcrumb[];
	const product = data[1] as ProductType;
	const breadcrumbs: HCLBreadcrumb[] = [...breadcrumb];
	if (product) {
		breadcrumbs.push({ label: product.name });
	}
	return breadcrumbs.map(({ label, value, seo }) => ({
		label,
		value,
		href: seo?.href,
	}));
};

export const getBreadcrumbTrail = async ({ cache, id: _id, context }: ContentProps) => {
	const pageData = await getPageDataFromId(cache, context.query.path, context);
	const { tokenName = '', tokenValue = '', tokenExternalValue = '' } = pageData ?? {};
	const settings = await getSettings(cache, context);
	const { storeId, defaultCatalogId: catalogId, langId } = getServerSideCommon(settings, context);
	const props = { tokenName, tokenValue, tokenExternalValue, storeId, catalogId, langId };
	const key = unstableSerialize([props, DATA_KEY]);
	const params = constructRequestParamsWithPreviewToken({ context });
	const value = cache.get(key) || fetcher(false)(props, params);
	cache.set(key, value);
	return await value;
};

export const useBreadcrumbTrail = () => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { storeId, langId, defaultCatalogId: catalogId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const { data: pageData } = usePageDataFromId();
	const { tokenName = '', tokenValue = '', tokenExternalValue = '' } = pageData ?? {};
	const { data, error } = useSWR(
		tokenName && storeId
			? [{ tokenName, tokenValue, tokenExternalValue, storeId, catalogId, langId }, DATA_KEY]
			: null,
		async ([props]) => fetcher(true)(props, params)
	);
	const breadcrumb = useMemo(() => (data ? dataMap(data) : []), [data]);
	return { breadcrumb, uniqueId: tokenValue, error };
};
