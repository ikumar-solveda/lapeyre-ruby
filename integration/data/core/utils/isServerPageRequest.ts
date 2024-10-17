/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { IncomingMessage } from 'http';

export const isServerPageRequest = (req: IncomingMessage) => !req.url?.startsWith('/_next');
