/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { RA_EXCLUSIVE } from '@/data/constants/catalog';
import { ProductAttribute, Ribbon } from '@/data/types/Product';

/**
 * Ejected callback (for use elsewhere) for reducing an attribute into ribbon(s)
 * @param collector aggregator array for ribbons
 * @param param1 destructured attribute and its values to conver to ribbons
 * @returns collector
 */
export const transformAttrValsToRibbons = (
	collector: Ribbon[],
	{ identifier, values }: ProductAttribute
) => {
	// don't return destructure of original (not efficient when large) -- push to original
	collector.push(...values.map(({ value }) => ({ identifier, value: value.toString() })));
	return collector;
};

/**
 * Ejected callback (for use elsewhere) for sorting an array of ribbons in a particular order
 * @param a first ribbon to check
 * @param b second ribbon to check
 * @returns `-1` if `a` contains `Exclusive` as identifier, `1` if `b` does and `0` otherwise
 */
export const ribbonSorter = (a: Ribbon, b: Ribbon) =>
	a.identifier.toLowerCase().includes(RA_EXCLUSIVE)
		? -1
		: b.identifier.toLowerCase().includes(RA_EXCLUSIVE)
		? 1
		: 0;
