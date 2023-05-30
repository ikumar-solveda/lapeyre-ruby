/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { apiProxyOptions } from 'integration/generated/apiProxyOptions';
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

export const config = {
	api: {
		// Enable `externalResolver` option in Next.js
		externalResolver: true,
		bodyParser: false,
	},
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const proxyOption = apiProxyOptions.find(({ pathRewrite }) =>
		pathRewrite.some(({ patternStr }) => RegExp(patternStr).test(req?.url || ''))
	);

	if (proxyOption) {
		httpProxyMiddleware(req, res, {
			...proxyOption,
			secure: process.env.NODE_ENV === 'development' ? false : true,
		});
	} else {
		res.status(404).send(null);
	}
};

export default handler;
