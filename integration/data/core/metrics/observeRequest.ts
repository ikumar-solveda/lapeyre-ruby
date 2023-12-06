/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { requestMetrics } from '@/data/metrics';
import { RequestHistogramPayload } from '@/data/types/Metrics';

export const observeRequest = async (labels: RequestHistogramPayload, value: number) =>
	requestMetrics?.observe({ ...labels, worker_id: process.pid }, value);
