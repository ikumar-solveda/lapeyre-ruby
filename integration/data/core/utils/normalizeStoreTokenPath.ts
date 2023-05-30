/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { isStringEqual } from '@/data/utils/isStringEqual';

export const normalizeStoreTokenPath = ({
	path,
	storeUrlKeyword,
}: {
	path: string[] | string | undefined;
	storeUrlKeyword: string | undefined;
}) => {
	if (storeUrlKeyword && path) {
		const p = [path].flat();
		return p[0] && isStringEqual(p[0], storeUrlKeyword ?? '') ? p.slice(1) : p;
	} else {
		return path;
	}
};
