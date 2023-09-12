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
};

module.exports = nextConfig;
// TODO: turn off sourcemap GMV?
