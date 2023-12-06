/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { backendMetrics } from '@/data/metrics';
import { BackendRequestHistogramPayload } from '@/data/types/Metrics';

export const observeBackend = async (labels: BackendRequestHistogramPayload, value: number) =>
	backendMetrics?.observe({ ...labels, worker_id: process.pid }, value);
