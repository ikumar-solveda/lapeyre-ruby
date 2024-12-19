/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { BC_COOKIE, COOKIES, HC_PREFIX, MAX_AGE, WC_PREFIX } from '@/data/constants/cookie';
import { MARKETING_COOKIE_PREFIX, REFERRER_COOKIE } from '@/data/constants/marketing';
import {
	COOKIE_MARKETING_TRACKING_CONSENT,
	COOKIE_PRIVACY_NOTICE_VERSION,
} from '@/data/constants/privacyPolicy';
import { useSettings } from '@/data/Settings';
import { getCookieName } from '@/data/utils/getCookieName';
import noop from 'lodash/noop';
import { createContext, FC, PropsWithChildren, useCallback, useMemo } from 'react';
import { useCookies } from 'react-cookie';

export type CookiesSingletonContextType = {
	setSessionCookie: <T>(name: string, value?: T) => void;
	setCookie: <T>(name: string, value: T | undefined, session?: boolean) => void;
	getCookie: <T>(key: string) => T;
	getName: (key: string) => string;
};

export const CookiesSingletonContext = createContext<CookiesSingletonContextType>({
	setSessionCookie: noop,
	setCookie: noop,
	getCookie: noop as CookiesSingletonContextType['getCookie'],
	getName: noop as CookiesSingletonContextType['getName'],
});

export const CookiesSingletonProvider: FC<PropsWithChildren> = ({ children }) => {
	const { settings } = useSettings();
	const { table, cookieNames } = useMemo(() => {
		const table = {
			[COOKIES.breadcrumb]: getCookieName({
				prefix: HC_PREFIX,
				storeId: settings.storeId,
				name: BC_COOKIE,
			}),
			[COOKIES.referrer]: getCookieName({
				prefix: MARKETING_COOKIE_PREFIX,
				storeId: settings.storeId,
				name: REFERRER_COOKIE,
			}),
			[COOKIES.privacy]: getCookieName({
				prefix: WC_PREFIX,
				storeId: settings.storeId,
				name: COOKIE_PRIVACY_NOTICE_VERSION,
			}),
			[COOKIES.marketing]: getCookieName({
				prefix: WC_PREFIX,
				storeId: settings.storeId,
				name: COOKIE_MARKETING_TRACKING_CONSENT,
			}),
		};
		return {
			table,
			cookieNames: Object.values(table),
		};
	}, [settings]);

	const [cookies, setCookieValue, removeCookie] = useCookies(cookieNames);
	const getName = useCallback((key: string) => table[key as keyof typeof table], [table]);

	/**
	 * get cookie value using simplified key as index
	 */
	const getCookie = useCallback(
		// eslint-disable-next-line comma-spacing
		<T,>(key: string) => cookies?.[getName(key)] as T,
		[cookies, getName]
	);

	/**
	 * set cookie value, remove cookie if value is undefined.
	 */
	const setCookie = useCallback(
		// eslint-disable-next-line comma-spacing
		<T,>(key: string, value: T | undefined, session?: boolean) => {
			const name = getName(key);
			if (value !== undefined) {
				setCookieValue(name, value, { path: '/', ...(session ? undefined : { maxAge: MAX_AGE }) });
			} else {
				removeCookie(name, { path: '/' });
			}
		},
		[getName, removeCookie, setCookieValue]
	);

	const setSessionCookie = useCallback(
		// eslint-disable-next-line comma-spacing
		<T,>(key: string, value?: T) => setCookie(key, value, true),
		[setCookie]
	);

	return (
		<CookiesSingletonContext.Provider value={{ getName, getCookie, setCookie, setSessionCookie }}>
			{children}
		</CookiesSingletonContext.Provider>
	);
};
