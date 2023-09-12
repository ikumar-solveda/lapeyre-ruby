/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import cluster from 'node:cluster';
import { createServer } from 'node:https';
import process from 'node:process';
// import { parse } from 'url';
import next from 'next';
import fs from 'node:fs';
import { collectDefaultMetrics } from 'prom-client';
import * as conf from './next.config';

const getNumberCPUs = () => {
	const numCPUs = parseInt(process.env.NODE_INSTANCE_NUMBER ?? '');
	return Math.max(Number.isNaN(numCPUs) ? 1 : numCPUs, 1);
};

const dev = process.env.NODE_ENV !== 'production';
const numCPUs = dev ? 1 : getNumberCPUs();

if (cluster.isPrimary) {
	console.log(`Primary ${process.pid} is running`);

	// Fork workers.
	// eslint-disable-next-line functional/no-loop-statement
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, _code, _signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});
} else {
	collectDefaultMetrics({
		gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
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
			try {
				await handle(req, res);
			} catch (error) {
				console.error('Error occurred handling', req.url, error);
				res.statusCode = 500;
				res.end('internal server error');
			}
		})
			.once('error', (err) => {
				console.error(err);
				process.exit(1);
			})
			.listen(port);
		server.keepAliveTimeout = 60 * 1000 + 1000;
		server.headersTimeout = 60 * 1000 + 2000;
		console.log(
			`> Server listening at\n
		\x1b[33m https://${hostname}:${port} \x1b[0m\n\n as ${dev ? 'development' : process.env.NODE_ENV}`
		);
	});

	console.log(`Worker ${process.pid} started`);
}
