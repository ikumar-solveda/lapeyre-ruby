/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { CookiesSingletonProvider } from '@/data/cookie/cookiesSingletonProvider';
import { PropsWithChildren } from 'react';
import { Cookies, CookiesProvider as ReactCookiesProvider } from 'react-cookie';

const defaultSetOptions = {
	path: '/',
	secure: true,
};
type Props = {
	cookies: Cookies;
};
export const CookiesProvider = ({ cookies, children }: PropsWithChildren<Props>) => (
	<ReactCookiesProvider cookies={cookies} defaultSetOptions={defaultSetOptions}>
		<CookiesSingletonProvider>{children}</CookiesSingletonProvider>
	</ReactCookiesProvider>
);
