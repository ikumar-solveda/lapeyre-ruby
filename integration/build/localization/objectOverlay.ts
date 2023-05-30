/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

/**
 * Recursively additive application of an overlay object
 * onto a base object, returning the resulting new object.
 *
 * @param {{base:object,overlay:object}} Params
 * @returns {object} Overlaid
 */
export const objectOverlay = ({
	base,
	overlay,
}: Record<string, Record<string, any>>) => {
	const overlaid = { ...base };
	Object.keys(overlay).forEach(
		(key) =>
			(overlaid[key] =
				typeof overlay[key] === 'object' &&
				!Array.isArray(overlay[key]) &&
				overlay[key] !== null
					? objectOverlay({ base: overlaid[key] || {}, overlay: overlay[key] })
					: overlay[key])
	);
	return overlaid;
};
