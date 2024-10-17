/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { GetServerSidePropsContext } from 'next';

export const isLocaleSensitiveRequest = (req: GetServerSidePropsContext['req']) =>
	!req.url?.startsWith('/_next') || req.url.startsWith('/_next/data');
