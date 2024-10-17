/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import { DEFAULT_LOCATION } from '@/data/constants/storeLocator';
import { getMockPathFileAndFallback } from '@/data/utils/getMockPathFileAndFallback';
import '@testing-library/jest-dom';
import fs from 'fs-extra';
import { globSync } from 'glob';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { defaultFallbackInView } from 'react-intersection-observer';
import { basePath } from './next.config';
declare module 'jest-fetch-mock' {
	interface FetchMock {
		last: Record<string, number>;
	}
}

const basePathPrefix = basePath || '';

enableFetchMocks();
fetchMock.last = {};
fetchMock.last[process.env.JEST_WORKER_ID ?? 1] = Date.now();
fetchMock.mockResponse(
	(req) =>
		new Promise((resolve) => {
			fetchMock.last[process.env.JEST_WORKER_ID ?? 1] = Date.now();
			const reqUrl = req.url;
			// TODO centralize api routing logic
			const pathRewrite = [
				{
					patternStr: `^${basePathPrefix}/api/resources`,
					replaceStr: '/wcs/resources',
				},
				{
					patternStr: `^${basePathPrefix}/api/search`,
					replaceStr: '/search/resources',
				},
			].find(({ patternStr }) => RegExp(patternStr).test(reqUrl.toString()));

			if (pathRewrite) {
				const url = reqUrl
					.toString()
					.replace(RegExp(pathRewrite.patternStr), pathRewrite.replaceStr);

				const { path, file, fallback } = getMockPathFileAndFallback({
					url,
					method: 'GET',
				});
				const pathWithWildcard = path
					.split('/')
					.map((p) => `{${p},__}`)
					.join('/');
				const matchFile = globSync(`integration/mocks${pathWithWildcard}/${file}`).at(0);
				const matchPath = matchFile
					? matchFile.slice(0, matchFile.indexOf(file))
					: `integration/mocks${path}/`;

				const jsonFile = fs.existsSync(matchFile ?? `integration/mocks${path}/${fallback}`)
					? fs
							.readFileSync(matchFile ?? `integration/mocks${path}/${fallback}`)
							?.toString()
							?.match(/#import "(.+)"/)
							?.at(1) || ''
					: '';

				if (!fs.existsSync(`${matchPath}${jsonFile}`)) {
					return resolve(JSON.stringify({}));
				}
				resolve(
					JSON.stringify(fs.readJSONSync(`${matchPath}${jsonFile}`, { throws: false }) || {})
				);
			}
			resolve('{}');
		})
);

global.IntersectionObserver = jest.fn();
global.scrollTo = jest.fn();
defaultFallbackInView(false);

jest.mock('next/router', () => ({
	useRouter: () => ({
		route: '/',
		pathname: '',
		// TODO Allow this to be set by the individual test.
		query: { path: ['furniture'] },
		asPath: '',
		locale: 'en-us',
	}),
}));

const mockGeolocation = {
	getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
		Promise.resolve(
			success({
				coords: {
					latitude: DEFAULT_LOCATION.lat,
					longitude: DEFAULT_LOCATION.lng,
				},
			})
		)
	),
};
(global as any).navigator.geolocation = mockGeolocation;
