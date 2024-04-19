/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { Settings } from '@/data/_Settings';
import { notCDNCacheableRoute } from '@/data/containers/manifest';
import { normalizeStoreTokenPath } from '@/data/utils/normalizeStoreTokenPath';
import { Translation, TranslationTable } from 'integration/generated/translations';
import { GetServerSidePropsContext } from 'next';

export const isCDNCacheableRoute = ({
	context,
	settings,
	routes,
}: {
	context: GetServerSidePropsContext;
	settings: Settings;
	routes: Translation;
}) => {
	const { storeToken } = settings;
	const normalizedPath = normalizeStoreTokenPath({
		path: context.query.path,
		storeUrlKeyword: storeToken?.urlKeywordName,
	});
	const [routeKey, _] = (Object.entries(routes).find(
		([_, value]) =>
			typeof value === 'object' && normalizedPath && value?.route === [...normalizedPath].join('/')
	) || []) as unknown as [keyof TranslationTable['Routes'], unknown];
	return !routeKey || !notCDNCacheableRoute[routeKey]; // routekey not found means browsing page, it is cacheable.
};
