/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { chain } from '@/utils/chain';

describe('chain function', () => {
	it('should apply the provided function to the starting value and return a new value', () => {
		const result = chain(4)((x) => x * 2);
		expect(result.value()).toEqual(8);
	});

	it('should apply multiple functions to the starting value', () => {
		const result = chain(4)((x) => x * 2)((y) => y + 1)((z) => z / 2);
		expect(result.value()).toEqual(4.5);
	});

	it('should return the starting value if no function is provided', () => {
		const result = chain(4);
		expect(result.value()).toEqual(4);
	});
});

test('logging current value and passing it on to the next function', () => {
	const conLog = jest.spyOn(console, 'log').mockImplementation((data) => data);
	expect(chain(4)(chain.log)((x) => x * 2)(chain.log).value()).toBe(8);
	expect(conLog).toHaveBeenCalledTimes(2);
	expect(conLog.mock.results[0].value).toBe(4);
	expect(conLog.mock.results[1].value).toBe(8);
	conLog.mockReset();
});
