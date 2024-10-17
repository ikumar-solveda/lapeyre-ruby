/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import {
	QueryParameterNameToHandleType,
	QueryParametersOfConcern,
} from '@/data/types/QueryParametersOfConcern';
import { Token } from '@/data/types/Token';
import { extractParamsOfConcern } from '@/data/utils/extractParamsOfConcern';
import { UrlObject } from 'url';

const EMPTY_TOKEN: Token = {};

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
	if (url !== undefined) {
		const { queryOfConcern: queryInConcern } = extractParamsOfConcern(asPath);
		if (typeof url === 'string') {
			return !url.startsWith('http')
				? {
						pathname: storePath
							? `${storePath}/${url}`
									.replace('//', '/')
									.replace(/\/$/, '') // trailing slash
									.replace(`${storePath}${storePath}`, storePath)
							: url,
						query: queryInConcern,
				  }
				: url;
		} else {
			return typeof url.pathname === 'string' && !url.pathname.startsWith('http')
				? {
						...url,
						query:
							typeof url.query === 'string'
								? url.query + buildQueryString(queryInConcern)
								: {
										...url.query,
										...queryInConcern,
								  },
						pathname: storePath
							? `${storePath}/${url.pathname}`
									.replace('//', '/')
									.replace(/\/$/, '') // trailing slash
									.replace(`${storePath}${storePath}`, storePath)
							: url.pathname,
				  }
				: url;
		}
	}
	return url;
};
