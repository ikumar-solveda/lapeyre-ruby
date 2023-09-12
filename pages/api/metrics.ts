/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// metrics collect endpoint for container.
import type { NextApiRequest, NextApiResponse } from 'next';
import { register } from 'prom-client';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', register.contentType);
	res.end(await register.metrics());
};

export default handler;
