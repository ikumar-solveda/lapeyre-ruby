/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import NodeCache from 'node-cache';

import { DEFAULT_CACHE_TTL, NODE_CACHE_MESSAGE } from '@/data/constants/cache';
import { ClusterNodeCacheMessage } from '@/data/types/Server';
import { traceWithId } from '@/data/utils/loggerUtil';
import cluster from 'cluster';
import { uniqueId } from 'lodash';
import crypto from 'node:crypto';

const cacheTTL = (() => {
	const envTTL = parseInt(process.env.CACHE_TTL ?? '');
	return (isNaN(envTTL) ? DEFAULT_CACHE_TTL : envTTL) / 1000;
})();

export const nodeCache = (() => {
	const cache = new NodeCache({
		stdTTL: cacheTTL,
		useClones: false,
		checkperiod: cacheTTL,
	});
	(cache as any).id = (crypto && crypto.randomUUID()) || uniqueId();
	// upon creation of each nodeCache, register an event listener to handle invalidation
	process &&
		process.on('message', (message: ClusterNodeCacheMessage) => {
			if (message.type === NODE_CACHE_MESSAGE.WORKER_REQUEST) {
				traceWithId(message.requestId, 'invalidated all node cache entries', {
					process: process.pid,
					worker: cluster.worker?.id,
					'cache entry size': cache.keys().length,
					'node cache ID': (cache as any).id,
				});
				nodeCache.flushAll();
				traceWithId(message.requestId, 'finish invalidating all node cache entries', {
					process: process.pid,
					worker: cluster.worker?.id,
					'cache entry size after invalidation': cache.keys().length,
					'node cache ID': (cache as any).id,
				});
			}
		});
	return cache;
})();
