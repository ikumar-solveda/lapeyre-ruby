/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

export const filterEmptyObjectValues = (obj: Record<string, any>) =>
	Object.entries(obj).reduce(
		(obj, [key, value]) => ({
			...obj,
			...(value !== null && value !== undefined && value !== ''
				? { [key]: value }
				: {}),
		}),
		{}
	);
