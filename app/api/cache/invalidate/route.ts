/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { NODE_CACHE_MESSAGE } from '@/data/constants/cache';
import { REQUEST_ID_HEADER_KEY } from '@/data/constants/environment';
import { traceWithId } from '@/data/utils/loggerUtil';
import { NextRequest } from 'next/server';
import cluster from 'node:cluster';

const REQUEST = {
	type: NODE_CACHE_MESSAGE.REQUEST,
};

export const POST = async (request: NextRequest) => {
	const requestId = request.headers.get(REQUEST_ID_HEADER_KEY) ?? '';
	// broadcast invalidate cache request
	process?.send && process.send({ ...REQUEST, requestId });
	traceWithId(requestId, 'received invalidate cache request', {
		worker: cluster.worker?.id,
		process: cluster.worker?.process.pid,
	});
	return new Response('Success', { status: 201 });
};
