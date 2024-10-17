/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { productFetcher } from '@/data/Content/_Product';
import { ID } from '@/data/types/Basic';
import {
	Breadcrumb,
	BreadcrumbProductType,
	HCLBreadcrumb,
	MappedResponseBreadcrumb,
} from '@/data/types/Breadcrumb';
import { ProductQueryResponse, ProductType } from '@/data/types/Product';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { RequestParams } from 'integration/generated/query/http-client';
import { chunk, isNil, omitBy, uniqWith, zipObjectDeep } from 'lodash';
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

const trailToCrumb = (trail: string[]): HCLBreadcrumb[] =>
	chunk(trail, 3).map((c) => zipObjectDeep(['value', 'label', 'seo.href'], c) as HCLBreadcrumb);

const crumbToPerCrumbTrail = (crumbs: HCLBreadcrumb[]): string[][] => {
	const trail: string[][] = [];
	crumbs.forEach((crumb, index) => {
		trail.push([
			...(index > 0 ? trail[index - 1] : []),
			crumb.value ?? '',
			crumb.label,
			crumb.seo?.href ?? '',
		]);
	});
	trail.unshift([]);
	return trail;
};

const sameCrumb = (a?: HCLBreadcrumb, b?: HCLBreadcrumb): boolean =>
	!!(
		(!a && !b) ||
		(a && b && a.value === b.value && a.label === b.label && a.seo?.href === b.seo?.href)
	);

export const responseDataMap = (
	data: Array<HCLBreadcrumb[] | ProductType>
): Array<MappedResponseBreadcrumb> => {
	const rc: Array<MappedResponseBreadcrumb> = [data?.at(0) as HCLBreadcrumb[]];
	const product = data?.at(1) as ProductType;
	if (product) {
		rc.push({ name: product.name, id: product.id, type: 'PRODUCT' });
	}
	return rc;
};

export const dataMapV2 = (
	data: Array<MappedResponseBreadcrumb> | undefined,
	trail: string[] = []
): Breadcrumb[] => {
	let breadcrumbs: HCLBreadcrumb[];

	if (data?.length) {
		let breadcrumb = data[0] as HCLBreadcrumb[];
		const product = data[1] as BreadcrumbProductType;

		if (trail?.length) {
			const last = breadcrumb.at(-1); // possibly undefined due to 0-length array
			breadcrumb = trailToCrumb(trail);
			if (!product && last) {
				breadcrumb.push(last as HCLBreadcrumb);
			}
		}
		breadcrumbs = uniqWith(breadcrumb, sameCrumb);
		if (product) {
			breadcrumbs.push({ label: product.name, value: product.id, type: product.type });
		}
	} else {
		breadcrumbs = [];
	}
	const asTrail = crumbToPerCrumbTrail(breadcrumbs);

	return breadcrumbs.map(
		({ label, value, seo, type }, index) =>
			omitBy(
				{ label, value, type, href: seo?.href, trail: asTrail[index] },
				isNil
			) as unknown as HCLBreadcrumb
	);
};

/**
 * @deprecated use dataMapV2 instead
 */
export const dataMap = (
	data: Array<HCLBreadcrumb[] | ProductType>,
	trail: string[] = []
): Breadcrumb[] => {
	let breadcrumbs: HCLBreadcrumb[];

	if (data?.length) {
		let breadcrumb = data[0] as HCLBreadcrumb[];
		const product = data[1] as ProductType;

		if (trail?.length) {
			const last = breadcrumb.at(-1);
			breadcrumb = trailToCrumb(trail);
			if (!product) {
				breadcrumb.push(last as HCLBreadcrumb);
			}
		}

		breadcrumbs = [...breadcrumb];
		if (product) {
			breadcrumbs.push({ label: product.name, value: product.id, type: 'PRODUCT' });
		}
	} else {
		breadcrumbs = [];
	}
	const asTrail = crumbToPerCrumbTrail(breadcrumbs);

	return breadcrumbs.map(
		({ label, value, seo, type }, index) =>
			omitBy(
				{ label, value, type, href: seo?.href, trail: asTrail[index] },
				isNil
			) as unknown as HCLBreadcrumb
	);
};
