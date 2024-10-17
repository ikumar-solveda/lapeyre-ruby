/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { NODE_CACHE_MESSAGE } from '@/data/constants/cache';

export type ClusterMetricsMessage = {
	type: 'store-metrics:aggregate-request' | 'store-metrics:aggregate-response';
	value: string;
};

export type ClusterNodeCacheMessage = {
	type: 'node-cache:invalidate-all-request' | 'node-cache:invalidate-worker-all-request';
	value?: any;
	requestId: string;
};

export const isClusterNodeCacheMessage = (message: any): message is ClusterNodeCacheMessage =>
	Object.values(NODE_CACHE_MESSAGE).includes(message.type);
