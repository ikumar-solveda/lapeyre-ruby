/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { MARKETING_COOKIE_PREFIX, REFERRER_COOKIE } from '@/data/constants/marketing';
import { BareContext, PagesRouterAppPropsType } from '@/data/types/PagesRouter';
import { getCookieName } from '@/data/utils/getCookieName';
import { hasExternalRefererHeader } from '@/data/utils/hasExternalRefererHeader';
import type { AppProps } from 'next/app';
import { Cookies } from 'react-cookie';

/**
 * Generate a cookie object that can be passed-in to the `CookiesProvider` so that the cookies can
 *   be accessed and used during the initial server-side render as necessary.
 *
 * @param context container for request and response
 * @param props pages router application props
 * @returns react-cookie instantiated cookies
 */
export const initializeCookiesAtServer = (
	context: BareContext,
	props: AppProps<PagesRouterAppPropsType>
) => {
	const { req } = context;
	const { settings } = props.pageProps;
	const cookies = new Cookies(req?.headers.cookie);
	const referrer = req?.headers.referer;

	if (hasExternalRefererHeader(req) && settings) {
		const { storeId } = settings;
		const name = getCookieName({ prefix: MARKETING_COOKIE_PREFIX, name: REFERRER_COOKIE, storeId });
		cookies.set(name, referrer, { httpOnly: false });
	}

	return cookies;
};
