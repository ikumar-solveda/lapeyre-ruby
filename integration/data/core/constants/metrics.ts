/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

export const NAMES = {
	backend: 'nextjs_backend_request_duration_seconds',
	request: 'nextjs_http_request_duration_seconds',
};

export const HELP_TEXT = {
	backend: 'nextjs store backend request duration histogram',
	request: 'nextjs store request duration histogram',
};

export const LABELS = {
	worker_id: 'worker_id',
	http_status: 'http_status',
	http_method: 'http_method',
	store_id: 'store_id',
	hostname: 'hostname',
};

export const CONFIGS = {
	backend: {
		name: NAMES.backend,
		help: HELP_TEXT.backend,
		buckets: [0.005, 0.02, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 5, 10],
		labelNames: [
			LABELS.hostname,
			LABELS.worker_id,
			LABELS.store_id,
			LABELS.http_method,
			LABELS.http_status,
		],
	},
	request: {
		name: NAMES.request,
		help: HELP_TEXT.request,
		buckets: [0.005, 0.02, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 5, 10],
		labelNames: [LABELS.worker_id, LABELS.store_id, LABELS.http_method, LABELS.http_status],
	},
};
