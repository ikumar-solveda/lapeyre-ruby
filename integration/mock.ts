/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import http from 'http';
import mockserver from 'mockserver';
import path from 'path';
import dotenv from 'dotenv';
const mocksDirectory = path.resolve(__dirname, './mocks');
dotenv.config({ path: `.env.local` });
const port = process.env.MOCK_HOST_PORT;

const headerKeys = ['WCPersonalization', 'WCTrustedToken'];

/**
 * Sort the parameter so that we have identical mock file,
 * with langId always at the end of the mock file name.
 */
const normalizeParams = (url: string) =>
	url
		.split('?')
		.map((partial, index) =>
			index === 0
				? partial
				: partial
						.split('&')
						.filter((q) => !q.startsWith('contractId'))
						.sort((a, b) => (a.startsWith('langId') ? 1 : a.localeCompare(b)))
						.join('&')
		)
		.join('?');

const applyMockServerHeadersFromCookies = ({
	req,
	headerKeys,
}: {
	req: http.IncomingMessage;
	headerKeys: string[];
}) => {
	const cookies = req.headers.cookie;
	if (cookies && req.url?.includes('@self')) {
		const headers = cookies.split(';').reduce((acc, cookie) => {
			const [key, value] = cookie.split('=');
			return {
				...acc,
				[key.trim()]: value.trim(),
			};
		}, {});
		Object.entries(headers)
			.filter(([key]) => headerKeys.includes(key))
			.forEach(([key, value]) =>
				typeof value === 'string' ? (req.headers[key.toLocaleLowerCase()] = value) : null
			);
	}
};

mockserver.headers = headerKeys;

const mockServer = http.createServer(mockserver(mocksDirectory)).listen(port);
mockServer.on('request', (req) => {
	req.url = normalizeParams(req.url || '');
	applyMockServerHeadersFromCookies({ req, headerKeys });
	console.log('Mock request url: ', req.url);
});
console.log(`Mock Server is running on port ${port}`);
