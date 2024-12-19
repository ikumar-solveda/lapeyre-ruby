/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { APIConfig } from './types';

export const getPrivateClientInstance = (
	config: APIConfig
) => `export const privateClient = new HttpClient({
	baseUrl: (process.env.USE_MOCK === 'true' ? 'http://localhost:' + process.env.MOCK_HOST_PORT : process.env.${config.envHostKey} as string) + '${config.private}',
	traceDetails,
});
`;
