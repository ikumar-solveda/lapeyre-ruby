/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { parse, isLosslessNumber } from 'lossless-json';

export const losslessParser = (data: any) => {
	let rc = data;
	if (typeof data === 'string') {
		rc = parse(data, (_key, value) => (isLosslessNumber(value) ? value.toString() : value));
	}
	return rc;
};
