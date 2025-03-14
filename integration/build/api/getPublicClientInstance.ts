/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { APIConfig } from './types';

export const getPublicClientInstance = (
	basePath: string,
	config: APIConfig
) => `export const publicClient = new HttpClient({
	baseUrl: process.env.NODE_ENV === 'production'? '${
		// the environment variable `PUBLIC_CLIENT_USE_PUBLIC` below is a for test production build
		// in a dev's laptop where there is no web server rewrite for service
		process.env.PUBLIC_CLIENT_USE_PUBLIC !== 'true'
			? `${basePath}${config.private}`
			: `${basePath}${config.public}`
	}': '${basePath}${config.public}',
	isPublic: true,
	traceDetails,
});`;
