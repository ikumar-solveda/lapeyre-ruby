/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { ClusterNodeCacheMessage } from '@/data/types/Server';
import { noop } from 'lodash';

/**
 * The value of cache entry time of live in milliseconds.
 * Default to 1 minute.
 *
 */
export const DEFAULT_CACHE_TTL = 60000;

export const DEFAULT_CACHE_CONTROL_HEADER = 'public, max-age=1800, stale-while-revalidate=60';

export const mockCache = {
	get: (..._args: any[]) => null,
	set: noop,
} as any;

export const NODE_CACHE_MESSAGE: { [key: string]: ClusterNodeCacheMessage['type'] } = {
	REQUEST: 'node-cache:invalidate-all-request',
	WORKER_REQUEST: 'node-cache:invalidate-worker-all-request',
};
