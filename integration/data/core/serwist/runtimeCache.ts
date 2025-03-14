/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { PAGES_CACHE_NAME } from '@serwist/next/worker';
import type { RuntimeCaching } from 'serwist';
import {
	CacheFirst,
	ExpirationPlugin,
	NetworkFirst,
	NetworkOnly,
	RangeRequestsPlugin,
	StaleWhileRevalidate,
} from 'serwist';

const MAX_AGE_SECONDS_ONE_HOUR = 60 * 60; // 1 hour
const MAX_AGE_SECONDS_ONE_DAY = 24 * 60 * 60; // 24 hours
const MAX_AGE_SECONDS_ONE_WEEK = 7 * 24 * 60 * 60; // 7 days
const MAX_AGE_SECONDS_ONE_MONTH = 30 * 24 * 60 * 60; // 30 days
const MAX_AGE_SECONDS_ONE_YEAR = 365 * 24 * 60 * 60; // 365 days

/**
 * The paths in this array are used to match API requests in the service worker.
 */
const API_PATHS_STARTS_WITH = ['/api/', '/wcs/', '/search/', '/rfq/', '/inventory/'];
const API_PATHS_CONTAINS = ['/model-results/'];

/**
 * A regular expression that matches any of the API paths defined in the `API_PATHS` array.
 *
 * The regular expression is constructed by joining all the paths in the `API_PATHS` array
 * with the '|' (OR) operator and wrapping them in a capturing group.
 *
 * Example:
 * If `API_PATHS` contains ['/api/user', '/search/product'], the resulting regular expression
 * will match strings that start with either '/api/user' or '/search/product'.
 */
const API_PATHS_REGEX = new RegExp(
	`^(${API_PATHS_STARTS_WITH.join('|')})|(${API_PATHS_CONTAINS.join('|')})`,
	'i'
);

/**
 * The default, recommended list of caching strategies for applications
 * built with Next.js.
 *
 * The default cache is built on top of `defaultCache@serwist/next/worker'.
 * @see https://github.com/serwist/serwist/blob/main/packages/next/src/index.worker.ts
 * and
 * @see https://serwist.pages.dev/docs/next/worker-exports#default-cache
 */
export const runtimeCache: RuntimeCaching[] =
	process.env.NODE_ENV !== 'production'
		? [
				{
					matcher: /.*/i,
					handler: new NetworkOnly(),
				},
		  ]
		: [
				{
					matcher: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
					handler: new CacheFirst({
						cacheName: 'google-fonts-webfonts',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 4,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_YEAR, // 365 days
								maxAgeFrom: 'last-used',
							}),
						],
					}),
				},
				{
					matcher: /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
					handler: new StaleWhileRevalidate({
						cacheName: 'google-fonts-stylesheets',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 4,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_WEEK, // 7 days
								maxAgeFrom: 'last-used',
							}),
						],
					}),
				},
				{
					matcher: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
					handler: new StaleWhileRevalidate({
						cacheName: 'static-font-assets',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 4,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_WEEK, // 7 days
								maxAgeFrom: 'last-used',
							}),
						],
					}),
				},
				{
					matcher: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
					handler: new StaleWhileRevalidate({
						cacheName: 'static-image-assets',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 64,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_MONTH, // 30 days
								maxAgeFrom: 'last-used',
							}),
						],
					}),
				},
				{
					matcher: /\/_next\/static.+\.js$/i,
					handler: new CacheFirst({
						cacheName: 'next-static-js-assets',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 64,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_DAY, // 24 hours
								maxAgeFrom: 'last-used',
							}),
						],
					}),
				},
				{
					matcher: /\/_next\/image\?url=.+$/i,
					handler: new StaleWhileRevalidate({
						cacheName: 'next-image',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 64,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_DAY, // 24 hours
								maxAgeFrom: 'last-used',
							}),
						],
					}),
				},
				{
					matcher: /\.(?:mp3|wav|ogg)$/i,
					handler: new CacheFirst({
						cacheName: 'static-audio-assets',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 32,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_DAY, // 24 hours
								maxAgeFrom: 'last-used',
							}),
							new RangeRequestsPlugin(),
						],
					}),
				},
				{
					matcher: /\.(?:mp4|webm)$/i,
					handler: new CacheFirst({
						cacheName: 'static-video-assets',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 32,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_DAY, // 24 hours
								maxAgeFrom: 'last-used',
							}),
							new RangeRequestsPlugin(),
						],
					}),
				},
				{
					matcher: /\.(?:js)$/i,
					handler: new StaleWhileRevalidate({
						cacheName: 'static-js-assets',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 48,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_DAY, // 24 hours
								maxAgeFrom: 'last-used',
							}),
						],
					}),
				},
				{
					matcher: /\.(?:css|less)$/i,
					handler: new StaleWhileRevalidate({
						cacheName: 'static-style-assets',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 32,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_DAY, // 24 hours
								maxAgeFrom: 'last-used',
							}),
						],
					}),
				},
				{
					matcher: /\/_next\/data\/.+\/.+\.(json$|json\?path=.+)/i,
					handler: new NetworkFirst({
						cacheName: 'next-data',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 32,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_DAY, // 24 hours
								maxAgeFrom: 'last-used',
							}),
						],
					}),
				},
				{
					matcher: /\.(?:json|xml|csv)$/i,
					handler: new NetworkFirst({
						cacheName: 'static-data-assets',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 32,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_DAY, // 24 hours
								maxAgeFrom: 'last-used',
							}),
						],
					}),
				},
				{
					matcher: ({ sameOrigin, url: { pathname } }) => {
						if (!sameOrigin) {
							return false;
						}

						if (API_PATHS_REGEX.test(pathname)) {
							return true;
						}

						return false;
					},
					method: 'GET',
					handler: new NetworkFirst({
						cacheName: 'apis',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 16,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_DAY, // 24 hours
								maxAgeFrom: 'last-used',
							}),
						],
						networkTimeoutSeconds: 10, // fallback to cache if API does not response within 10 seconds
					}),
				},
				{
					matcher: ({ request, url: { pathname }, sameOrigin }) =>
						request.headers.get('RSC') === '1' &&
						request.headers.get('Next-Router-Prefetch') === '1' &&
						sameOrigin &&
						!API_PATHS_REGEX.test(pathname),
					handler: new NetworkFirst({
						cacheName: PAGES_CACHE_NAME.rscPrefetch,
						plugins: [
							new ExpirationPlugin({
								maxEntries: 32,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_DAY, // 24 hours
							}),
						],
					}),
				},
				{
					matcher: ({ request, url: { pathname }, sameOrigin }) =>
						request.headers.get('RSC') === '1' && sameOrigin && !API_PATHS_REGEX.test(pathname),
					handler: new NetworkFirst({
						cacheName: PAGES_CACHE_NAME.rsc,
						plugins: [
							new ExpirationPlugin({
								maxEntries: 32,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_DAY, // 24 hours
							}),
						],
					}),
				},
				{
					matcher: ({ request, url: { pathname }, sameOrigin }) =>
						request.headers.get('Content-Type')?.includes('text/html') &&
						sameOrigin &&
						!API_PATHS_REGEX.test(pathname),
					handler: new NetworkFirst({
						cacheName: PAGES_CACHE_NAME.html,
						plugins: [
							new ExpirationPlugin({
								maxEntries: 32,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_DAY, // 24 hours
							}),
						],
					}),
				},
				{
					matcher: ({ url: { pathname }, sameOrigin }) =>
						sameOrigin && !API_PATHS_REGEX.test(pathname),
					handler: new NetworkFirst({
						cacheName: 'others',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 32,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_DAY, // 24 hours
							}),
						],
					}),
				},
				{
					matcher: ({ sameOrigin }) => !sameOrigin,
					handler: new NetworkFirst({
						cacheName: 'cross-origin',
						plugins: [
							new ExpirationPlugin({
								maxEntries: 32,
								maxAgeSeconds: MAX_AGE_SECONDS_ONE_HOUR, // 1 hour
							}),
						],
						networkTimeoutSeconds: 10,
					}),
				},
		  ];
