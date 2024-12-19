/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

export const register = async () => {
	if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NEXTJS_OTEL_ENABLED === 'true') {
		await import('./instrumentation.node');
	}
};
