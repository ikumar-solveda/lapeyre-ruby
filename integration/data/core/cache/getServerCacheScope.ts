/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PREVIEW_TOKEN_PARAM } from '@/data/constants/preview';
import { CacheScope } from '@/data/types/Cache';
import { UserContext } from '@/data/types/UserContext';
import { merge } from 'lodash';
import { GetServerSidePropsContext } from 'next';

/**
 * This is for data fetch cache that can be used by fallback
 * @param context
 * @param userContext
 * @returns
 */
export const getServerCacheScope = (
	context: GetServerSidePropsContext,
	userContext?: UserContext
): CacheScope => {
	const { registerType } = userContext?.basicInfo ?? {};
	const previewToken = [context.query[PREVIEW_TOKEN_PARAM]].flat(1).at(0);
	// do not cache preview at server level
	return previewToken
		? {
				requestScope: true,
				scopeKey: [{ previewToken }],
		  }
		: {
				requestScope: false,
				scopeKey: [{ registerType }],
		  };
};

/**
 * Additional server level cache key for protected routes, the scopeKey will not be part of key
 * that used by request level cache.
 */
export const getServerCacheScopeForProtectedRoutes = ({
	serverScopeKey = {},
	context,
	userContext,
	havingCart = null,
}: {
	serverScopeKey?: any;
	havingCart?: boolean | null; // backward compatibility
	context: GetServerSidePropsContext;
	userContext?: UserContext;
}) => {
	const scope = getServerCacheScope(context, userContext);
	if (scope.requestScope) {
		return scope;
	} else {
		return havingCart !== null
			? merge({ scopeKey: merge([{ havingCart }], [serverScopeKey]) }, scope)
			: merge({ scopeKey: [serverScopeKey] }, scope);
	}
};
