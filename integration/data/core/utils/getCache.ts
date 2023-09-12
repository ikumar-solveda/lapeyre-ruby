/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { DEFAULT_CACHE_TTL } from '@/data/constants/cache';
import { Cache, CacheScope } from '@/data/types/Cache';
import memoryCache from 'memory-cache';
import { unstable_serialize } from 'swr';

const getCacheTTL = () => {
	const envTTL = parseInt(process.env.CACHE_TTL ?? '');
	return isNaN(envTTL) ? DEFAULT_CACHE_TTL : envTTL;
};

export const getCache = (): Cache => {
	const cache = new Map();
	const get = (key: string, scope?: CacheScope) => {
		const { requestScope = true, scopeKey } = scope ?? {};
		let cacheEntry = cache.get(key);
		if (requestScope) {
			return cacheEntry;
		}
		if (!cacheEntry) {
			const memoryCacheKey = scopeKey ? unstable_serialize([scopeKey, key]) : key;
			cacheEntry = memoryCache.get(memoryCacheKey);
			if (cacheEntry) {
				cache.set(key, cacheEntry);
			}
		}
		return cacheEntry;
	};

	const set = (key: string, value: any, scope?: CacheScope) => {
		const { requestScope = true, scopeKey } = scope ?? {};
		if (!has(key, scope)) {
			if (!requestScope) {
				const memoryCacheKey = scopeKey ? unstable_serialize([scopeKey, key]) : key;
				memoryCache.put(memoryCacheKey, value, getCacheTTL());
			}
			return cache.set(key, value);
		} else {
			return cache;
		}
	};

	const has = (key: string, scope?: CacheScope) => {
		const { requestScope = true, scopeKey } = scope ?? {};
		const requestScopeHas = cache.has(key);
		if (requestScope) {
			return requestScopeHas;
		} else {
			if (!requestScopeHas) {
				const memoryCacheKey = scopeKey ? unstable_serialize([scopeKey, key]) : key;
				const cacheEntry = memoryCache.get(memoryCacheKey);
				if (cacheEntry) {
					cache.set(key, cacheEntry);
				}
			}
			return cache.has(key);
		}
	};

	/**
	 * Fetch request scope cache keys
	 * @returns
	 */
	const keys = () => cache.keys();

	/**
	 * Request scope cache values for SWR fallback
	 * @returns
	 */
	const values = () => cache.values();

	return {
		get,
		values,
		set,
		keys,
		has,
	};
};
