/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import type { IncomingContent } from '@/data/types/IncomingContent';

export type DataProps = {
	data: IncomingContent | undefined;
};

export type OpenGraphImageType = {
	image: string;
	alt: string;
};

export type OpenGraphDataType = {
	type: string;
	title: string;
	description: string;
	url?: string;
	images?: OpenGraphImageType[];
	price?: string;
	currency?: string;
	locale?: string;
	site?: string;
	brand?: string;
	availability?: string;
};
