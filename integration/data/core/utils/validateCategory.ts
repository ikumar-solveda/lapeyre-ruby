/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

/**
 * Validate the parent category paths -- this is really only for the scenario
 *   where there might be multiple parent category-paths, in which case we find
 *   the first valid path and return the last category in it, e.g.,
 *   given valid paths in parentCatalogGroupID: ['1/2/3', '4/5/6'], this will return '3'
 * @param parentCatalogGroupID an array or single string representing slash-separated parent category-ids
 * @returns the immediate parent category in a given valid path
 */
export const validateCategory = (parentCatalogGroupID: string | string[]): string => {
	const parentCategories = Array.isArray(parentCatalogGroupID)
		? parentCatalogGroupID
		: [parentCatalogGroupID];
	// TODO: validate this against the top-cats cache when available
	const catWithPath = parentCategories.at(0)?.split('/').filter(Boolean);
	return (catWithPath ? catWithPath.at(-1) : '') ?? '';
};
