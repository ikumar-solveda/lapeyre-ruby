/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { logger } from '@/logging/logger';
import { GetServerSidePropsContext } from 'next';
export const loggerCan = (level: string) => logger.levelVal <= logger.levels.values[level];

export const trace = (req: GetServerSidePropsContext['req'], msg: string, ...params: any[]) => {
	if (loggerCan('trace')) {
		const id = (req as any).id;
		logger.trace(`Request: %o: ${msg}`, id, ...params);
	}
};

export const debug = (req: GetServerSidePropsContext['req'], msg: string, ...params: any[]) => {
	if (loggerCan('debug')) {
		const id = (req as any).id;
		logger.debug(`Request: %o: ${msg}`, id, ...params);
	}
};
