/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useSettings } from '@/data/Settings';
import { MAX_AGE, WC_PREFIX } from '@/data/constants/cookie';
import { getCookieName } from '@/data/utils/getCookieName';
import { useCallback } from 'react';
import { useCookies } from 'react-cookie';

/**
 * @deprecated use CookiesSingletonContext instead
 */
export const useCookieState = <T>(
	name: string,
	session = true,
	prefix = WC_PREFIX
): [T | undefined, (value?: T | undefined) => void] => {
	const { settings } = useSettings();
	const cookieName = getCookieName({
		prefix,
		storeId: settings.storeId,
		name,
	});
	const [cookies, setCookie, removeCookie] = useCookies([cookieName]);

	const cookieValue = cookies[cookieName] as unknown as T | undefined;

	/**
	 * set cookie value, remove cookie if value is undefined.
	 */
	const setCookieValue = useCallback(
		(value?: T) => {
			if (value !== undefined) {
				session
					? setCookie(cookieName, value, { path: '/' })
					: setCookie(cookieName, value, { maxAge: MAX_AGE, path: '/' });
			} else {
				removeCookie(cookieName, { path: '/' });
			}
		},
		[cookieName, removeCookie, session, setCookie]
	);
	return [cookieValue, setCookieValue];
};
