/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
export const concatPathComponents = (...components: string[]) => {
	const filtered = components.filter(Boolean);
	const last = filtered.slice(-1);
	const withoutLast = filtered.slice(0, -1).map((v) => v.replaceAll(/\/+$/g, ''));
	const noSuffixes = [...withoutLast, ...last];
	const first = noSuffixes.slice(0, 1);
	const withoutFirst = noSuffixes.slice(1).map((v) => v.replaceAll(/^\/+/g, ''));
	const target = [...first, ...withoutFirst].join('/');
	return target;
};
