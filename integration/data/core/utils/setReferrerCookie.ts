/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import type { Settings } from '@/data/_Settings';
import { MARKETING_COOKIE_PREFIX, REFERRER_COOKIE } from '@/data/constants/marketing';
import { getCookieName } from '@/data/utils/getCookieName';
import { hasExternalRefererHeader } from '@/data/utils/hasExternalRefererHeader';
import { isServerPageRequest } from '@/data/utils/isServerPageRequest';
import Cookies from 'cookies';
import type { GetServerSidePropsContext } from 'next';

/**
 * Add or remove referrer cookie that will eventually make it to the browser
 *
 * @param context pages router app context
 * @param settings current store settings
 */
export const setReferrerCookie = (context: GetServerSidePropsContext, settings: Settings) => {
	const { res, req } = context;
	if (isServerPageRequest(req)) {
		const { storeId } = settings;
		const referrer = req.headers.referer;
		const notExternalReferrer = !hasExternalRefererHeader(req);
		const cookies = new Cookies(req, res);
		cookies.set(
			getCookieName({ prefix: MARKETING_COOKIE_PREFIX, name: REFERRER_COOKIE, storeId }),
			referrer ? (notExternalReferrer ? null : referrer) : null,
			{ overwrite: true, httpOnly: false }
		);
	}
};
