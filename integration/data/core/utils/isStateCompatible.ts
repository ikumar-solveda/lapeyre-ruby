/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { StateObject } from '@/data/types/Basic';

/**
 * Check if state objects are compatible.
 * @limitations unable to type check against array child types.
 * If needed, it would be best to use a robust type checking
 * library, such as Zod
 */
export const isStateCompatible = <B extends StateObject>({
	base,
	comparison,
}: {
	base: B;
	comparison: B;
}): boolean =>
	typeof base === 'object' && typeof comparison === 'object'
		? Object.entries(base).reduce(
				(compatible, [key, value]) =>
					!compatible
						? false
						: typeof value === 'object'
						? isStateCompatible({ base: value, comparison: comparison[key] })
						: typeof value === typeof comparison[key],
				true
		  )
		: false;
