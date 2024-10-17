/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { Settings } from '@/data/_Settings';
import { EmotionCache } from '@emotion/react';
import type { IncomingMessage, ServerResponse } from 'http';
import type { AppProps } from 'next/app';
import type { Cookies } from 'react-cookie';

export type PagesRouterAppPropsType = {
	fallback: any;
	settings: Settings;
	csrSession: boolean;
};

export type BareContext = {
	req?: IncomingMessage;
	res?: ServerResponse<IncomingMessage>;
};

export type MyAppProps = AppProps<PagesRouterAppPropsType> & {
	emotionCache?: EmotionCache;
	settings: Settings;
	cookies: Cookies;
};
