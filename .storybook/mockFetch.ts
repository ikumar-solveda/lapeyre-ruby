/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { mockPaths } from '../.stories/mocks';
import { getMockPathFileAndFallback } from '@/data/utils/getMockPathFileAndFallback';
import { apiProxyOptions } from 'integration/generated/apiProxyOptions';

const getMockData = async ({ url = '', method = '' }: Record<string, string | undefined>) => {
	const { path, file, fallback } = getMockPathFileAndFallback({ url, method });
	const jsonFile = mockPaths[`${path}/${file}`] || mockPaths[`${path}/${fallback}`];

	if (jsonFile) {
		return await fetch(`/mocks${path}/${jsonFile}`);
	} else {
		const wildCardPath = Object.keys(mockPaths).find((p) => checkWildCardMatch(path, p));
		if (wildCardPath) {
			const newJsonFile = mockPaths[wildCardPath];
			const newWildCardPath = wildCardPath.split('/').slice(0, -1).join('/');
			return await fetch(`/mocks${newWildCardPath}/${newJsonFile}`);
		} else {
			console.log('Mock Not Found', { path, file, fallback });
			return new Response(new Blob(), { status: 404, statusText: 'Not Found' });
		}
	}
};

const checkWildCardMatch = (path: string, wildCardPath: string) => {
	const pathArr = path.split('/');
	const wildCardPathArr = wildCardPath.split('/');
	const matches =
		pathArr.length === wildCardPathArr.length &&
		pathArr.every((p, index) => wildCardPathArr[index] === '__' || p === wildCardPathArr[index]);
	return matches;
};

export const mockFetch = (rootContext: Window) => {
	const ogFetch = rootContext.fetch;
	rootContext.fetch = (reqUrl, options) => {
		const pathRewrite = apiProxyOptions
			.map(({ pathRewrite }) => pathRewrite)
			.flat(1)
			.find(({ patternStr }) => RegExp(patternStr).test(reqUrl.toString()));
		if (pathRewrite) {
			return getMockData({
				url: reqUrl.toString().replace(RegExp(pathRewrite.patternStr), pathRewrite.replaceStr),
				method: options?.method,
			});
		}
		return ogFetch(reqUrl, options);
	};
};
