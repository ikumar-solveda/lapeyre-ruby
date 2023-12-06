/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import NodeCache from 'node-cache';

import { DEFAULT_CACHE_TTL } from '@/data/constants/cache';

const cacheTTL = (() => {
	const envTTL = parseInt(process.env.CACHE_TTL ?? '');
	return (isNaN(envTTL) ? DEFAULT_CACHE_TTL : envTTL) / 1000;
})();
export const nodeCache = new NodeCache({
	stdTTL: cacheTTL,
	useClones: false,
	checkperiod: cacheTTL,
});
