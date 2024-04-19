/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

/**
 * The function try to get the DATA_KEY portion of the `unstable_serialize` SWR key.
 * OOTB, DATA_KEY is always the last item in keys array before `unstable_serialize`
 */
export const getDataKey = (key: string) => {
	const _key = key.charAt(key.length - 1) === ',' ? key.slice(0, key.length - 1) : key;
	return _key.split(',').at(-1)?.replaceAll('"', '');
};
