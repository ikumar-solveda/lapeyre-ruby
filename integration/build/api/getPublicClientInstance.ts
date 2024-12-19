/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { APIConfig } from './types';

export const getPublicClientInstance = (
	basePath: string,
	config: APIConfig
) => `export const publicClient = new HttpClient({
	baseUrl: process.env.NODE_ENV === 'production' ? '${basePath}${config.private}' : '${basePath}${config.public}',
	isPublic: true,
	traceDetails,
});`;
