/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

export const METRICS = {
	REQUEST: 'store-metrics:aggregate-request',
	RESPONSE: 'store-metrics:aggregate-response',
};

export const KEEP_ALIVE_TIMEOUT = 60 * 1_000 + 1_000;
export const HEADERS_TIMEOUT = 60 * 1_000 + 2_000;
export const SERVER_METRICS_CONFIG = {
	request: {
		name: 'nextjs_http_request_duration_seconds',
		help: 'nextjs store request duration histogram',
		buckets: [0.005, 0.02, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 5, 10],
		labelNames: ['worker_id', 'http_status', 'http_method', 'store_id'],
	},
};

export type HCLServerResponseExtras = {
	hclData?: {
		storeId: string;
	};
};

export const CACHE_CONTROL = 'Cache-Control';
export const CACHE_CONTROL_VALUE = 'public, max-age=3600, stale-while-revalidate=60';
