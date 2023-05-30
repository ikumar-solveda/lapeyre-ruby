/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { createServer } from 'node:https';
// import { parse } from 'url';
import next from 'next';
import fs from 'node:fs';

import * as conf from './next.config';

const options = {
	key: fs.readFileSync(process.env.RUBY_KEY_PEM || 'certs/key.pem'),
	cert: fs.readFileSync(process.env.RUBY_CERT_PEM || 'certs/cert.pem'),
};

const port = parseInt(process.env.PORT || '3343', 10);
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';

const app = next({ dev, hostname, port, conf, customServer: true });
const handle = app.getRequestHandler();
app.prepare().then(() => {
	createServer(options, async (req, res) => {
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
	console.log(
		`> Server listening at\n
		\x1b[33m https://${hostname}:${port} \x1b[0m\n\n as ${dev ? 'development' : process.env.NODE_ENV}`
	);
});
