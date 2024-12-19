/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import isObject from 'lodash/isObject';
import transform from 'lodash/transform';

export const recursiveOmit = <T>(root: T, keysToOmit: Record<string, boolean>): T =>
	transform(root as any, (result: any, value: any, key: string) => {
		if (!(key in keysToOmit)) {
			result[key] = isObject(value) ? recursiveOmit(value, keysToOmit) : value;
		}
	});
