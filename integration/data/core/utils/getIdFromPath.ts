/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Token } from '@/data/types/Token';
import { isStringEqual } from '@/data/utils/isStringEqual';
import { ParsedUrlQuery } from 'querystring';

/**
 * Context path parse support for backward compatibility of ReactJs(Emerald) implementation.
 * @param path
 * @param contextPath
 * @returns
 */
export const getIdFromPath = (path: ParsedUrlQuery['path'], storeToken: Token = {}) => {
	const { urlKeywordName = '' } = storeToken;
	return (
		(Array.isArray(path)
			? path[0] && isStringEqual(path[0], urlKeywordName)
				? path.slice(1).at(-1)
				: path.at(-1)
			: path && isStringEqual(path, urlKeywordName)
			? 'home'
			: path) ?? 'home'
	);
};
