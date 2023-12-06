/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { logger } from '@/logging/logger';
import { GetServerSidePropsContext } from 'next';
export const loggerCan = (level: string) => logger.levelVal <= logger.levels.values[level];
type RequestType = GetServerSidePropsContext['req'] | undefined;

export const trace = (req: RequestType, msg: string, ...params: any[]) => {
	if (loggerCan('trace')) {
		const id = (req as any)?.id ?? 'client';
		logger.trace(`Request: %o: ${msg}`, id, ...params);
	}
};

export const debug = (req: RequestType, msg: string, ...params: any[]) => {
	if (loggerCan('debug')) {
		const id = (req as any)?.id ?? 'client';
		logger.debug(`Request: %o: ${msg}`, id, ...params);
	}
};

export const error = (req: RequestType, msg: string, ...params: any[]) => {
	if (loggerCan('error')) {
		const id = (req as any)?.id ?? 'client';
		logger.error(`Request: %o: ${msg}`, id, ...params);
	}
};
