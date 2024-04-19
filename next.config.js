/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: true,
	reactStrictMode: true,
	swcMinify: true,
	i18n: {
		locales: ['de-DE', 'en-US', 'es-ES', 'fr-FR', 'it-IT', 'ja-JP', 'ko-KR', 'pl-PL', 'pt-BR', 'pt-PT', 'ro-RO', 'ru-RU', 'zh-CN', 'zh-TW'],
		defaultLocale: 'en-US',
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
	},
};

module.exports = nextConfig;
// TODO: turn off sourcemap GMV?
