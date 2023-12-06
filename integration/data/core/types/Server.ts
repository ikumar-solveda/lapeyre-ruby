/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

export type ClusterMetricsMessage = {
	type: 'store-metrics:aggregate-request' | 'store-metrics:aggregate-response';
	value: string;
};
