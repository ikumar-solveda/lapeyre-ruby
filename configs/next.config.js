/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: false,
	reactStrictMode: true,
	swcMinify: true,
	i18n: {
		locales: [
			'default',
			'de-de',
			'en-us',
			'es-es',
			'fr-fr',
			'it-it',
			'ja-jp',
			'ko-kr',
			'pl-pl',
			'pt-br',
			'ro-ro',
			'ru-ru',
			'zh-cn',
			'zh-tw',
		],
		defaultLocale: 'default',
		localeDetection: false,
	},
	env: {
		USE_MOCK: process.env.USE_MOCK,
	},
	experimental: {
		// clientRouterFilter: false,
		clientRouterFilterAllowedRate: 0.0001,
		// set error rate smaller for BloomFilter to fix dynamic route match wrong path issue.
		// default value of this is 0.01 if not set, 0.001 also work
		// if still have issues, we may set `clientRouterFilter` to false

		// https://github.com/vercel/next.js/discussions/44596
		// we added middleware to resolve app-router redirections and not to impact any prefetching
		// behaviour on the storefront -- we'll set this to 'strict' for now especially since its
		// impact is a no-op with a side-effect
		middlewarePrefetch: 'strict',
		optimizePackageImports: ['@types/lodash', '@react-google-maps/api'],
		instrumentationHook: true,
	},
	poweredByHeader: false,
};
module.exports = nextConfig;
