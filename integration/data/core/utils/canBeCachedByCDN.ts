/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { isB2BStore } from '@/data/Settings-Server';
import { Settings } from '@/data/_Settings';
import { PREVIEW_TOKEN_PARAM } from '@/data/constants/preview';
import { isCDNCacheableRoute } from '@/data/utils/isCDNCacheableRoute';
import { Translation } from 'integration/generated/translations';
import { GetServerSidePropsContext } from 'next';

/**
 * Determine whether the user information needs to be fetched.
 * @returns boolean, true if it is non-CDN cache page, false otherwise
 */
export const canBeCachedByCDN = ({
	context,
	settings,
	routes,
}: {
	context: GetServerSidePropsContext;
	settings: Settings;
	routes: Translation;
}) =>
	![context.query[PREVIEW_TOKEN_PARAM]].flat(1).at(0) &&
	// !context.req.url?.startsWith('/_next') &&
	!isB2BStore(settings) &&
	isCDNCacheableRoute({ context, settings, routes });
