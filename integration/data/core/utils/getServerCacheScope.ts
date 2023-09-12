/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PREVIEW_TOKEN_PARAM } from '@/data/constants/preview';
import { CacheScope } from '@/data/types/Cache';
import { UserContext } from '@/data/types/UserContext';
import { GetServerSidePropsContext } from 'next';

export const getServerCacheScope = (
	context: GetServerSidePropsContext,
	userContext?: UserContext
): CacheScope => {
	const { registerType } = userContext?.basicInfo ?? {};
	const previewToken = [context.query[PREVIEW_TOKEN_PARAM]].flat(1).at(0);
	return {
		requestScope: false,
		scopeKey: {
			registerType,
			previewToken,
		},
	};
};
