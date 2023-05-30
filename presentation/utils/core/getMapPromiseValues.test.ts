/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { getMapPromiseValues } from '@/utils/getMapPromiseValues';

describe('getMapPromiseValues', () => {
	it('should return an object with the resolved values of the promises in the map', async () => {
		const map = new Map([
			['key1', Promise.resolve('value1')],
			['key2', Promise.resolve('value2')],
		]);
		const obj = await getMapPromiseValues(map);
		expect(obj).toEqual({ key1: 'value1', key2: 'value2' });
	});

	it('should ignore undefined values in the map', async () => {
		const map = new Map([
			['key1', Promise.resolve('value1')],
			['key2', Promise.resolve(undefined)],
			['key3', Promise.resolve('value3')],
		] as Iterable<readonly [string, Promise<string>]>);
		const obj = await getMapPromiseValues(map);
		expect(obj).toEqual({ key1: 'value1', key3: 'value3' });
	});

	it('should reject the returned promise if any of the promises in the map are rejected', async () => {
		const map = new Map([
			['key1', Promise.resolve('value1')],
			['key2', Promise.reject(new Error('Some error'))],
		]);
		await expect(getMapPromiseValues(map)).rejects.toEqual(new Error('Some error'));
	});
});
