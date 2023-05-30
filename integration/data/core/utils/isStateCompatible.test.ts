/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { isStateCompatible } from '@/data/utils/isStateCompatible';

test('states with the same keys and value types return true', () => {
	expect(isStateCompatible({ base: { foo: 'bar' }, comparison: { foo: 'zed' } })).toBe(true);
});

test('states with nested same keys and value types return true', () => {
	expect(
		isStateCompatible({
			base: { foo: { bar: 'red' } },
			comparison: { foo: { bar: 'blue' } },
		})
	).toBe(true);
});

test('states with the different keys or value types return true', () => {
	expect(
		isStateCompatible({
			base: { foo: 'bar' },
			comparison: { bar: 'zed' } as any,
		})
	).toBe(false);
});

test('states with nested different keys or value types return true', () => {
	expect(
		isStateCompatible({
			base: { foo: { bar: 'red' } },
			comparison: { foo: { bar: [] } },
		})
	).toBe(false);
});
