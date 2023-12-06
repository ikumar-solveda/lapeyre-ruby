/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

export type RequestHistogramPayload = {
	worker_id?: string | number;
	store_id: string | number;
	http_method: string;
	http_status: string | number;
};

export type BackendRequestHistogramPayload = {
	worker_id?: string | number;
	hostname: string;
	store_id: string | number;
	http_method: string;
	http_status: string | number;
};
