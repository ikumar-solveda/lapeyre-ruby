/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { useLocalization } from '@/data/Localization';
import { Settings } from '@/data/Settings';
import { dataRouteProtection } from '@/data/containers/manifest';
import { Token } from '@/data/types/Token';
import { normalizeStoreTokenPath } from '@/data/utils/normalizeStoreTokenPath';
const EMPTY_TOKEN: Token = {};

type TranslatedRoutes = ReturnType<typeof useLocalization<'Routes'>>;

/**
 * a client-side counterpart of `@data/utils/isCDNCacheableRoute`
 */
export const isCDNCacheableRoute = ({
	path,
	settings,
	routes,
}: {
	path: string[] | string | undefined;
	settings: Settings;
	routes: TranslatedRoutes;
}) => {
	const { storeToken = EMPTY_TOKEN } = settings;
	const { urlKeywordName } = storeToken;
	const normalizedPath = [normalizeStoreTokenPath({ path, storeUrlKeyword: urlKeywordName })]
		.flat()
		.filter(Boolean)
		.join('/');
	const [routeKey, _] = (Object.entries(routes).find(
		([_, value]) =>
			typeof value === 'object' && normalizedPath && value.route.t() === normalizedPath
	) || []) as unknown as [keyof TranslatedRoutes, unknown];
	return !routeKey || !dataRouteProtection[routeKey];
};
