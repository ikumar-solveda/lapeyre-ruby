/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { SUBSTITUTION, SUBSTITUTION_MASKED } from '@/data/constants/marketing';
import { ESpotContainerType } from '@/data/types/ESpot';
import { getMockPathFileAndFallback } from '@/data/utils/getMockPathFileAndFallback';
import { apiProxyOptions } from 'integration/generated/apiProxyOptions';
import { mockPaths } from '../.stories/mocks';
const keys = Object.keys(mockPaths);

const getMockData = async ({ url = '', method = '' }: Record<string, string | undefined>) => {
	const { path, file, fallback } = getMockPathFileAndFallback({ url, method });
	const jsonFile = mockPaths[`${path}/${file}`] || mockPaths[`${path}/${fallback}`];

	if (jsonFile) {
		return await fetch(`/mocks${path}/${jsonFile}`);
	} else {
		const wildCardPath = keys.find((p) => checkWildCardMatch(path, p));
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

const eSpot_contentReplacer = (
	text: string | undefined,
	replacementMap: Record<string, string>
) => {
	let replaced = text as string;
	if (replaced) {
		Object.entries(replacementMap).forEach(([k, v]) => {
			replaced = replaced.replaceAll(k, v);
		});
	}
	return replaced;
};

const eSpot_substitutionConverter = (params: Record<string, string>) => {
	const candidates = Object.keys(params).filter(
		(k) => k.startsWith(`${SUBSTITUTION}Name`) || k.startsWith(`${SUBSTITUTION_MASKED}Name`)
	);
	return candidates.reduce((agg, v) => {
		const key = params[v];
		const value = params[v.replace('Name', 'Value')];
		agg[key] = value;
		return agg;
	}, {} as Record<string, string>);
};

const eSpot_postProcess = async (reqUrl: string, response: Response) => {
	let rc;
	const query = reqUrl.split('?')?.at(1);
	if (query) {
		const params = Object.fromEntries(new URLSearchParams(query));
		const hasSubs = !!Object.keys(params).find((k) => k.startsWith(SUBSTITUTION));
		if (hasSubs) {
			const replacementMap = eSpot_substitutionConverter(params);
			const raw: ESpotContainerType = await response.json();
			raw.MarketingSpotData.forEach((root) =>
				root.baseMarketingSpotActivityData?.forEach((data) =>
					data.marketingContentDescription?.forEach(
						(content) =>
							(content.marketingText = eSpot_contentReplacer(content.marketingText, replacementMap))
					)
				)
			);
			const { status, statusText, headers } = response;
			const body = new Blob([JSON.stringify(raw)], { type: 'application/json' });
			rc = new Response(body, { status, statusText, headers });
		}
	}
	return rc;
};

const postProcess = async (reqUrl: string, response: Promise<Response>) => {
	const og = await response;
	const clone = og.clone();
	let rc;

	const espot = await eSpot_postProcess(reqUrl, clone);
	if (espot) {
		rc = espot;
	} else {
		rc = og;
	}

	return rc;
};

export const mockFetch = (rootContext: Window) => {
	const ogFetch = rootContext.fetch;
	rootContext.fetch = (reqUrl, options) => {
		const url = reqUrl.toString();
		const pathRewrite = apiProxyOptions
			.map(({ pathRewrite }) => pathRewrite)
			.flat(1)
			.find(({ patternStr }) => RegExp(patternStr).test(url));
		if (pathRewrite) {
			return postProcess(
				url,
				getMockData({
					url: url.replace(RegExp(pathRewrite.patternStr), pathRewrite.replaceStr),
					method: options?.method,
				})
			);
		}
		return postProcess(url, ogFetch(reqUrl, options));
	};
};
