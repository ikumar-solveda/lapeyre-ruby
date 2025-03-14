/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { runtimeCache } from '@/data/serwist/runtimeCache';
import type { PrecacheEntry, SerwistGlobalConfig, SerwistOptions } from 'serwist';

declare global {
	// This declares the value of `injectionPoint` to TypeScript.
	// `injectionPoint` is the string that will be replaced by the
	// actual precache manifest. By default, this string is set to
	// `"self.__SW_MANIFEST"`.
	interface WorkerGlobalScope extends SerwistGlobalConfig {
		__SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
	}
}

declare const self: ServiceWorkerGlobalScope;

export const serwistOptions: SerwistOptions = {
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	navigationPreload: true,
	runtimeCaching: runtimeCache,
	offlineAnalyticsConfig: true, // Enable offline analytics playback.
	fallbacks: {
		entries: [
			{
				// Define all pages to be caught by this fallback
				matcher: ({ request }) => request.destination === 'document' || request.mode === 'navigate',
				// When offline, these URLs will redirect to /offline
				url: '/offline',
			},
		],
	},
};
