/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IncomingMessage } from 'http';

export const hasExternalRefererHeader = (req?: IncomingMessage) => {
	const reqHost = req?.headers.host;
	const referrer = req?.headers.referer;
	return req && referrer && (!reqHost || !referrer.includes(reqHost));
};
