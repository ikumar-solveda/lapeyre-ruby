/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { productFetcher } from '@/data/Content/_Product';
import { ID } from '@/data/types/Basic';
import { Breadcrumb, HCLBreadcrumb } from '@/data/types/Breadcrumb';
import { ProductQueryResponse, ProductType } from '@/data/types/Product';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { RequestParams } from 'integration/generated/query/http-client';
import { isNil, omitBy } from 'lodash';
import { GetServerSidePropsContext } from 'next';

// TODO: Breadcrumb has duplicated call to products endpoint on product page and PLP page,
// can be optimized with SWR to avoid extra calls.

export const fetcher =
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

export const dataMap = (data: Array<HCLBreadcrumb[] | ProductType>): Breadcrumb[] => {
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
