/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// health check endpoint for container.
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).send({ success: true });
};

export default handler;
