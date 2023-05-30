/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

const normalizeParams = (url: string) =>
	url
		.split('?')
		.map((partial, index) =>
			index === 0
				? partial
				: partial
						.split('&')
						.sort((a, b) =>
							a.startsWith('langId') ? 1 : b.startsWith('langId') ? -1 : a.localeCompare(b)
						)
						.join('&')
		)
		.join('?');

export const getMockPathFileAndFallback = ({ url, method }: { url: string; method: string }) => {
	const [path, query] = normalizeParams(url).split('?');
	const file = `${method}${query ? `--${query}` : ''}.mock`;
	const fallback = `${method}.mock`;
	return {
		path,
		file,
		fallback,
	};
};
