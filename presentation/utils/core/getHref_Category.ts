/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CategoryType } from '@/data/types/Category';

/**
 * Appends `category` info into an an existing breadcrumb trail sequence
 * @param trail existing breadcrumb trail sequence
 * @param category info to append to trail
 * @returns `category` info appended to `trail`
 */
const getBreadcrumbsCategoryAppendedToQuery = (trail: string[], category?: CategoryType) => {
	if (category && (trail.length || category.parentCatalogGroupID === `/${category.uniqueID}`)) {
		const root = category.parentCatalogGroupID === `/${category.uniqueID}`;
		return [...(root ? [] : trail), category.uniqueID, category.name, category?.seo?.href ?? ''];
	} else {
		return undefined;
	}
};

export const getHref_Category = (
	category: CategoryType | undefined,
	parentCategory: CategoryType | undefined,
	trail: string[] = []
) => ({
	pathname: category?.seo.href as string,
	query: { trail: getBreadcrumbsCategoryAppendedToQuery(trail as string[], parentCategory) },
});
