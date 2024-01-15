/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Token } from '@/data/types/Token';
import { normalizeStoreTokenPath } from '@/data/utils/normalizeStoreTokenPath';
import { ParsedUrlQuery } from 'querystring';

/**
 * Context path parse support for backward compatibility of ReactJs(Emerald) implementation.
 * @param path
 * @param contextPath
 * @returns
 */
export const getIdFromPath = (path: ParsedUrlQuery['path'], storeToken: Token = {}) =>
	[normalizeStoreTokenPath({ path, storeUrlKeyword: storeToken.urlKeywordName })]
		.flat()
		.filter(Boolean)
		.join('/') || 'home';
