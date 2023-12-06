/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// metrics collect endpoint for container.
import { METRICS } from '@/data/constants/server';
import { ClusterMetricsMessage } from '@/data/types/Server';
import type { NextApiRequest, NextApiResponse } from 'next';
import cluster from 'node:cluster';
import { register } from 'prom-client';

const REQUEST = {
	type: METRICS.REQUEST,
};

const fallback = (_value?: any) => {
	throw new Error('resolver not initialized');
};

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	let resolve: (value: unknown) => void = fallback;
	const p = new Promise((_resolve) => (resolve = _resolve));
	const onMessage = ({ type, value }: ClusterMetricsMessage) => {
		if (type === METRICS.RESPONSE) {
			resolve(value);
		}
	};

	// listen for message from primary with aggregated metrics
	process.on('message', onMessage);

	// send request to cluster's primary for aggregated metrics
	cluster.worker?.send(REQUEST);

	res.setHeader('Content-Type', register.contentType);

	// get response
	const rc = await p;

	// remove listener
	process.removeListener('message', onMessage);

	// done
	res.end(rc);
};

export default handler;
