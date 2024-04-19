/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { logger } from '@/logging/logger';
import { GetServerSidePropsContext } from 'next';
export const loggerCan = (level: string) => logger.levelVal <= logger.levels.values[level];
type RequestType = GetServerSidePropsContext['req'] | undefined;

/**
 * @deprecated use traceWithId
 */
export const trace = (req: RequestType, msg: string, ...params: any[]) => {
	if (loggerCan('trace')) {
		const id = (req as any)?.id ?? 'client';
		logger.trace(`Request: %o: ${msg}`, id, ...params);
	}
};

/**
 * @deprecated use debugWithId
 */
export const debug = (req: RequestType, msg: string, ...params: any[]) => {
	if (loggerCan('debug')) {
		const id = (req as any)?.id ?? 'client';
		logger.debug(`Request: %o: ${msg}`, id, ...params);
	}
};

/**
 * @deprecated use errorWithId
 */
export const error = (req: RequestType, msg: string, ...params: any[]) => {
	if (loggerCan('error')) {
		const id = (req as any)?.id ?? 'client';
		logger.error(`Request: %o: ${msg}`, id, ...params);
	}
};

const getLog = (requestId: string | undefined, msg: string, objects?: Record<string, any>) => ({
	requestId,
	msg,
	...objects,
});

export const infoWithId = (
	requestId: string | undefined,
	msg: string,
	objects?: Record<string, any>
) => {
	if (loggerCan('info')) {
		logger.info(getLog(requestId, msg, objects));
	}
};

export const traceWithId = (
	requestId: string | undefined,
	msg: string,
	objects?: Record<string, any>
) => {
	if (loggerCan('trace')) {
		logger.trace(getLog(requestId, msg, objects));
	}
};

export const debugWithId = (
	requestId: string | undefined,
	msg: string,
	objects?: Record<string, any>
) => {
	if (loggerCan('debug')) {
		logger.debug(getLog(requestId, msg, objects));
	}
};

export const errorWithId = (
	requestId: string | undefined,
	msg: string,
	objects?: Record<string, any>
) => {
	if (loggerCan('error')) {
		logger.error(getLog(requestId, msg, objects));
	}
};
