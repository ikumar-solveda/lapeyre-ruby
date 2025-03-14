/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2025.
 */

import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';
import nextConfig from './configs/next.config.js';

const config = async (phase) => {
	const withBundleAnalyzer = (await import('@next/bundle-analyzer/index.js')).default({
		enabled: process.env.ANALYZE === 'true',
	});
	if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
		return withBundleAnalyzer(
			(await import('@serwist/next')).default({
				swSrc: 'service-worker/index.ts',
				swDest: 'public/sw.js',
				additionalPrecacheEntries: ['/offline'],
			})(nextConfig)
		);
	} else {
		return withBundleAnalyzer(nextConfig);
	}
};
export default config;
