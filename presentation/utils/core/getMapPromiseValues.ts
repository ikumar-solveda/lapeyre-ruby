/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Cache } from '@/data/types/Cache';

export const getMapPromiseValues = async (map: Cache): Promise<{ [key: string]: any }> => {
	const values = await Promise.all(Array.from(map.values()));
	return Array.from(map.keys()).reduce((obj, key, i) => {
		if (values[i] !== undefined) {
			obj[key] = values[i];
		}
		return obj;
	}, {} as { [key: string]: any });
};
