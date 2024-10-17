/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ParsedUrlQueryInput } from 'querystring';
import { UrlObject } from 'url';

export const hasBreadcrumbTrail = (url?: UrlObject | string) => {
	let rc = false;
	if (typeof url !== 'string' && typeof url?.query === 'object') {
		const { query } = url;
		const { trail } = query as ParsedUrlQueryInput;
		rc = !!(trail as string[])?.length;
	}
	return rc;
};
