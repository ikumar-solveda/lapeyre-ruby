/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { GenerateApiConfiguration } from 'swagger-typescript-api';

export const getDynamicClientGetter = (configuration: GenerateApiConfiguration) => `
const cache = {
	PUBLIC_CLIENT: {} as Record<string, HttpClient>,
	PRIVATE_CLIENT: {} as Record<string, HttpClient>,
};
const getClient = (pub: boolean, baseUrl: string, traceDetails?: Record<string, string>) => {
	const root = pub ? 'PUBLIC_CLIENT' : 'PRIVATE_CLIENT';
	if (!cache[root][baseUrl]) {
		cache[root][baseUrl] = new HttpClient({ baseUrl, traceDetails, isPublic: !!pub });
	}
	return cache[root][baseUrl];
};
const mockURL = \`http://localhost:\${process.env.MOCK_HOST_PORT}\`;
const getBaseOrMockURL = (baseUrl: string) => \`\${process.env.USE_MOCK === 'true' ? mockURL : baseUrl}${configuration.apiConfig.baseUrl}\`;
`;
