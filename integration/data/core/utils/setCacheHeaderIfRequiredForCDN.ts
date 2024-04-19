/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { Settings } from '@/data/Settings';
import { DEFAULT_CACHE_CONTROL_HEADER } from '@/data/constants/cache';
import { canBeCachedByCDN } from '@/data/utils/canBeCachedByCDN';
import { getPageProps } from '@/data/utils/getPageProps';
import { getRequestId } from '@/data/utils/getRequestId';
import { traceWithId } from '@/data/utils/loggerUtil';
import { Translation } from 'integration/generated/translations';
import { GetServerSidePropsContext } from 'next';

/**
 * Determine and set cache control header for CDN to consume.
 */
export const setCacheHeaderIfRequiredForCDN = ({
	pageProps,
	context,
	settings,
	routes,
}: {
	pageProps: Awaited<ReturnType<typeof getPageProps>>;
	context: GetServerSidePropsContext;
	settings: Settings;
	routes: Translation;
}) => {
	const { res } = context;
	if (pageProps.props && canBeCachedByCDN({ context, settings, routes })) {
		const header = process.env.CACHE_CONTROL_HEADER || DEFAULT_CACHE_CONTROL_HEADER;
		traceWithId(
			getRequestId(context),
			'METHOD setCacheHeaderIfRequiredForCDN set Cache-Control header with',
			{ value: header, store: settings.storeName, URL: context.req.url ?? '' }
		);
		res.setHeader('Cache-Control', header);
	}
};
