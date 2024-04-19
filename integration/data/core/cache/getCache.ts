/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { nodeCache } from '@/data/cache/nodeCache';
import { Cache, CacheScope } from '@/data/types/Cache';
import { loggerCan } from '@/data/utils/loggerUtil';
import { logger } from '@/logging/logger';
import { unstable_serialize } from 'swr';

export const getCache = (): Cache => {
	const cache = new Map();
	const get = (key: string, scope?: CacheScope) => {
		const { requestScope = true, scopeKey } = scope ?? {};
		const cacheEntry = cache.get(key);
		if (requestScope) {
			return cacheEntry;
		} else {
			const memoryCacheKey = scopeKey ? unstable_serialize([scopeKey, key]) : key;
			if (cacheEntry !== undefined) {
				return cacheEntry; // request scope reflect current value in request always has higher priority
			} else {
				const memCacheEntry = nodeCache.get(memoryCacheKey);
				if (loggerCan('trace')) {
					logger.trace(
						`get: ${
							memCacheEntry ? 'retrieved' : 'missed'
						} cache entry from node cache with key %o, value %o`,
						memoryCacheKey,
						memCacheEntry
					);
				}
				return memCacheEntry;
			}
		}
	};

	const set = (key: string, value: any, scope?: CacheScope) => {
		const { requestScope = true, scopeKey } = scope ?? {};
		if (!requestScope) {
			const memoryCacheKey = scopeKey ? unstable_serialize([scopeKey, key]) : key;
			if (!nodeCache.has(memoryCacheKey)) {
				nodeCache.set(memoryCacheKey, value);
				if (loggerCan('trace')) {
					logger.trace(
						'set: set cache entry to node cache with key %o, value %o',
						memoryCacheKey,
						value
					);
				}
				// only set if does not exist, not to extend the ttl
			}
		}
		return cache.set(key, value);
	};

	/**
	 * For caching things only at the server that aren't necessarily returned in the fallback
	 * @param key
	 * @param value
	 * @param scope
	 */
	const setPersistentOnly = (key: string, value: any, scope?: CacheScope) => {
		const { scopeKey } = scope ?? {};
		const memoryCacheKey = scopeKey ? unstable_serialize([scopeKey, key]) : key;
		if (!nodeCache.has(memoryCacheKey)) {
			nodeCache.set(memoryCacheKey, value);
			if (loggerCan('trace')) {
				logger.trace(
					'setPersistentOnly: set cache entry to node cache with key %o',
					memoryCacheKey
				);
			}
			// only set if does not exist, not to extend the ttl
		}
	};

	/**
	 *
	 * @param key
	 * @param scope
	 * @returns Scope specific, true if it exists, false otherwise.
	 */
	const has = (key: string, scope?: CacheScope) => {
		const { requestScope = true, scopeKey } = scope ?? {};
		if (requestScope) {
			return cache.has(key);
		} else {
			const memoryCacheKey = scopeKey ? unstable_serialize([scopeKey, key]) : key;
			return nodeCache.has(memoryCacheKey);
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

	const getRequestCache = () => cache;

	return {
		get,
		values,
		set,
		keys,
		has,
		getRequestCache,
		setPersistentOnly,
	};
};
