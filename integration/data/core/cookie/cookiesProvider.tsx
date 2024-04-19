/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { PropsWithChildren } from 'react';
import { CookiesProvider as ReactCookiesProvider } from 'react-cookie';

const defaultSetOptions = {
	path: '/',
	secure: true,
};

export const CookiesProvider = ({ children }: PropsWithChildren<any>) => (
	<ReactCookiesProvider defaultSetOptions={defaultSetOptions}>{children}</ReactCookiesProvider>
);
