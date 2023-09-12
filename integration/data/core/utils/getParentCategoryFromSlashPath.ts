/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

/**
 * Retrieves parent category from a slash-separated path or paths paths, e.g., given valid paths in
 *   path: ['1/2/3', '4/5/6'], this will return '3'
 * @param path an array or single string representing slash-separated parent category-ids
 * @returns the immediate parent category in a given valid path
 */
export const getParentCategoryFromSlashPath = (path: string | string[] = ''): string => {
	const parentCategories = Array.isArray(path) ? path : [path];
	const catWithPath = parentCategories.at(0)?.split('/').filter(Boolean);
	return (catWithPath ? catWithPath.at(-1) : '') ?? '';
};
