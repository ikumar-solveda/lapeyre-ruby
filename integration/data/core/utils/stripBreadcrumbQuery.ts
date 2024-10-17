/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ParsedUrlQueryInput } from 'querystring';
import { UrlObject } from 'url';

export const stripBreadcrumbQuery = (url?: UrlObject | string) => {
	let rc = undefined;
	if (typeof url !== 'string' && typeof url?.query === 'object') {
		const { query } = url;
		const { trail, ...noTrail } = query as ParsedUrlQueryInput;
		rc = (trail as string[])?.length ? { ...url, query: noTrail } : undefined;
	}
	return rc;
};
