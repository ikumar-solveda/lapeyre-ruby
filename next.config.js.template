/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

const CSP = {
	'default-src': [`'self'`],
	'child-src': [`'self'`],
	'object-src': [`'self'`],
	'script-src': [
		`'self'`,
		'*.googleapis.com',
		process.env.NODE_ENV === 'production' ? '' : `'unsafe-eval'`,
	].filter(Boolean),
	'connect-src': [`'self'`, '*.googleapis.com'],
	'style-src': [`'self'`, '*.googleapis.com', `'unsafe-inline'`],
	'font-src': [`'self'`, '*.gstatic.com'],
	'img-src': [`'self'`, '*.googleapis.com', '*.gstatic.com', 'data:'],
};

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
	headers: async () => [
		{
			source: '/:path*',
			headers: [
				{
					key: 'Content-Security-Policy',
					value: Object.entries(CSP)
						.map(([key, value]) => `${key} ${value.join(' ')};`)
						.join(' '),
				},
			],
		},
	],
};

module.exports = nextConfig;
// TODO: turn off sourcemap GMV?
