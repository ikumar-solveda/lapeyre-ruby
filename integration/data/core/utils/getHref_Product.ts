/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { HCLBreadcrumb } from '@/data/types/Breadcrumb';
import { ProductType } from '@/data/types/Product';

/**
 * Flatten `crumbs` into a sequenced trail; where the sequence is the internal-id, label and url
 * @param crumbs breadcrumbs to flatten into a sequenced array
 * @returns a string array representing the breadcrumbs (their elements) in a sequence
 */
const getBreadcrumbsAsQuery = (crumbs: HCLBreadcrumb[]) =>
	crumbs.flatMap((c) => [c.value, c.label, c.seo?.href ?? '']) as string[];

/**
 * Appends `crumbs` to an existing trail sequence
 * @param trail existing breadcrumb trail sequence
 * @param crumbs breadcrumbs to append to the trailer
 * @returns `crumbs` appended to `trail`
 */
const getBreadcrumbsAppendedToQuery = (trail: string[], crumbs: HCLBreadcrumb[] = []) => {
	if (trail.length) {
		const asQuery = crumbs.length ? getBreadcrumbsAsQuery(crumbs.slice(crumbs.length - 1)) : [];
		return [...trail, ...asQuery];
	} else {
		return getBreadcrumbsAsQuery(crumbs);
	}
};

export const getHref_Product = (
	product: ProductType | undefined,
	parentCrumb: HCLBreadcrumb[] | undefined,
	trail: string[] = []
) => ({
	pathname: product?.seo.href as string,
	query: { trail: getBreadcrumbsAppendedToQuery(trail as string[], parentCrumb) },
});
