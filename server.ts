/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { NODE_CACHE_MESSAGE } from '@/data/constants/cache';
import {
	CACHE_CONTROL,
	CACHE_CONTROL_VALUE,
	HCLServerResponseExtras,
	HEADERS_TIMEOUT,
	KEEP_ALIVE_TIMEOUT,
	METRICS,
	SERVER_METRICS_CONFIG,
} from '@/data/constants/server';
import {
	ClusterMetricsMessage,
	ClusterNodeCacheMessage,
	isClusterNodeCacheMessage,
} from '@/data/types/Server';
import { traceWithId } from '@/data/utils/loggerUtil';
import { uniqueId } from 'lodash';
import next from 'next';
import cluster, { Worker } from 'node:cluster';
import fs from 'node:fs';
import { IncomingMessage, ServerResponse } from 'node:http';
import { createServer } from 'node:https';
import process from 'node:process';
import { AggregatorRegistry, Histogram, collectDefaultMetrics, register } from 'prom-client';
import * as conf from './next.config';

const NON_JS_STATICS = /\.(css|png|jpg|gif|jpeg|svg|ttf)$/i;
const JS_STATICS = /\.js$/i;
const NEXT_STATICS = /\/_next\//i;

const observer = (() => {
	let rc;
	try {
		rc =
			(register?.getSingleMetric(SERVER_METRICS_CONFIG.request.name) as Histogram) ??
			new Histogram(SERVER_METRICS_CONFIG.request);
	} catch (e) {}
	return rc;
})();

const trackMetrics = (
	res: ServerResponse<IncomingMessage> & { req: IncomingMessage } & HCLServerResponseExtras,
	start: number
) => {
	const elapsed = (new Date().getTime() - start) / 1000;
	observer?.observe(
		{
			store_id: res.hclData?.storeId ?? '0',
			http_method: res.req.method ?? 'GET',
			http_status: res.statusCode,
			worker_id: process.pid,
		},
		elapsed
	);
};

const getNumberCPUs = () => {
	const numCPUs = parseInt(process.env.NODE_INSTANCE_NUMBER ?? '');
	return Math.max(Number.isNaN(numCPUs) ? 1 : numCPUs, 1);
};

const isStaticAsset = (url: string | undefined) =>
	url &&
	(null !== url.match(NON_JS_STATICS) ||
		(null !== url.match(JS_STATICS) && null === url.match(NEXT_STATICS)));

const dev = process.env.NODE_ENV !== 'production';
const numCPUs = dev ? 1 : getNumberCPUs();
const aggregator = new AggregatorRegistry(); // aggregation tracker for primary and workers (each)

const inCodeDebug = process.env.NODE_DEBUGGING === 'true';
if (cluster.isPrimary && !inCodeDebug) {
	// handler for messages from workers
	const onMessage = async (
		worker: Worker,
		message: ClusterMetricsMessage | ClusterNodeCacheMessage
	) => {
		if (message.type === METRICS.REQUEST) {
			let value;
			try {
				value = await aggregator.clusterMetrics();
			} catch (e) {
				value = e;
			}
			// respond to requesting worker with aggregated metrics
			worker.send({ type: METRICS.RESPONSE, value } as ClusterMetricsMessage);
		} else if (isClusterNodeCacheMessage(message)) {
			// send cache invalidation request from primary to workers
			Object.values(cluster.workers ?? {}).forEach((worker) => {
				traceWithId(message.requestId, 'sending Node cache invalidation worker request to', {
					worker: worker?.id,
					process: worker?.process.pid,
				});
				worker?.send({ type: NODE_CACHE_MESSAGE.WORKER_REQUEST, requestId: message.requestId });
			});
		}
	};

	console.log(`Primary ${process.pid} is running`);

	// Fork workers.
	// eslint-disable-next-line functional/no-loop-statement
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('message', onMessage); // listen for messages from workers
	cluster.on('exit', (worker, _code, _signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});
} else {
	collectDefaultMetrics({
		gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
		labels: { worker_id: process.pid }, // process.pid !== cluster.worker.id (ordinal)
	});
	const options = {
		key: fs.readFileSync(process.env.RUBY_KEY_PEM || 'certs/key.pem'),
		cert: fs.readFileSync(process.env.RUBY_CERT_PEM || 'certs/cert.pem'),
		keepAlive: true,
	};

	const dev = process.env.NODE_ENV !== 'production';
	const port = parseInt(process.env.PORT || '3343', 10);
	const hostname = 'localhost';

	const app = next({ dev, hostname, port, conf, customServer: true });
	const handle = app.getRequestHandler();

	app.prepare().then(() => {
		const server = createServer(options, async (req, res) => {
			// possible to handle Next.js routes
			const start = new Date().getTime();
			try {
				/**
				 * @deprecated no longer used -- kept only for backward compatibility
				 */
				(req as any).id = uniqueId();

				// cache non-next.js static assets
				if (isStaticAsset(req.url)) {
					res.setHeader(CACHE_CONTROL, CACHE_CONTROL_VALUE);
				}

				await handle(req, res);
			} catch (error) {
				console.error('Error occurred handling', req.url, error);
				res.statusCode = 500;
				res.end('internal server error');
			}
			trackMetrics(res, start);
		})
			.once('error', (err) => {
				console.error(err);
				process.exit(1);
			})
			.listen(port);

		server.keepAliveTimeout = KEEP_ALIVE_TIMEOUT;
		server.headersTimeout = HEADERS_TIMEOUT;

		console.log(
			`> Server listening at\n
		\x1b[33m https://${hostname}:${port} \x1b[0m\n\n as ${dev ? 'development' : process.env.NODE_ENV}`
		);
	});

	console.log(`Worker ${process.pid} started`);
}
