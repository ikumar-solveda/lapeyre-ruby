/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useSettings } from '@/data/Settings';
import { queryParametersToHandle } from '@/data/constants/queryParametersToHandle';
import {
	QueryParametersOfConcern,
	QueryParameterNameToHandleType,
} from '@/data/types/QueryParametersOfConcern';
import { Token } from '@/data/types/Token';
// this is the only place importing useRouter from 'next/router'
// eslint-disable-next-line no-restricted-imports
import { NextRouter, useRouter } from 'next/router';
import { UrlObject } from 'url';

const EMPTY_TOKEN: Token = {};

export const extractParamsOfConcern = (asPath: string) => {
	// asPath. e.g. "/emerald/furniture?a=b"
	const splits = asPath.split('?');
	const storeTokenCandidate = (splits.at(0) ?? '').split('/').at(1) ?? ''.toLowerCase();
	const urlParams = new URLSearchParams(splits.at(1) ?? '');
	const queryOfConcern = queryParametersToHandle.reduce(
		(params: QueryParametersOfConcern, name: QueryParameterNameToHandleType) => {
			const param = urlParams.get(name);
			if (param) params[name] = param;
			return params;
		},
		{} as QueryParametersOfConcern
	);
	return { storeTokenCandidate, queryOfConcern };
};

const buildQueryString = (queryInConcern: QueryParametersOfConcern) =>
	Object.keys(queryInConcern)
		.map((key) => key + '=' + queryInConcern[key as QueryParameterNameToHandleType])
		.join('&');

export const constructNextUrl = (
	asPath: string,
	url?: UrlObject | string,
	storeToken: Token = EMPTY_TOKEN
) => {
	const { urlKeywordName } = storeToken;
	const storePath = urlKeywordName ? `/${urlKeywordName}` : '';
	if (url) {
		const { queryOfConcern: queryInConcern } = extractParamsOfConcern(asPath);
		if (typeof url === 'string') {
			return !url.startsWith('http')
				? {
						pathname: `${storePath}/${url}`.replace('//', '/'),
						query: queryInConcern,
				  }
				: url;
		} else {
			return url.pathname && !url.pathname.startsWith('http')
				? {
						...url,
						query:
							typeof url.query === 'string'
								? url.query + buildQueryString(queryInConcern)
								: {
										...url.query,
										...queryInConcern,
								  },
						pathname: `${storePath}/${url.pathname}`.replace('//', '/'),
				  }
				: url;
		}
	}
	return url;
};

export const useNextRouter = () => {
	const _router = useRouter();
	const {
		settings: { storeToken },
	} = useSettings();
	const router = new Proxy(_router, {
		get: (target, prop: keyof NextRouter) => {
			if (prop === 'push' && typeof target[prop] === 'function') {
				const asPath = target['asPath'];
				return new Proxy(target[prop], {
					apply: (target, thisArg, argumentsList) => {
						argumentsList[0] = constructNextUrl(asPath, argumentsList[0], storeToken);
						return Reflect.apply(target, thisArg, argumentsList);
					},
				});
			} else {
				return Reflect.get(target, prop);
			}
		},
	});
	return router;
};
