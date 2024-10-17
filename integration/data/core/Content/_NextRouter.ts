/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { useSettings } from '@/data/Settings';
import { DEFAULT_LOCALE } from '@/data/config/DEFAULTS';
import { BC_COOKIE, HC_PREFIX } from '@/data/constants/cookie';
import { useCookieState } from '@/data/cookie/useCookieState';
import { constructNextUrl } from '@/data/utils/constructNextUrl';
import { extractParamsOfConcern } from '@/data/utils/extractParamsOfConcern';
import { hasBreadcrumbTrail } from '@/data/utils/hasBreadcrumbTrail';
import { stripBreadcrumbQuery } from '@/data/utils/stripBreadcrumbQuery';
import { switchOnMock } from '@/data/utils/switchOnMock';
// this is the only place importing useRouter from 'next/router'
// eslint-disable-next-line no-restricted-imports
import { NextRouter, useRouter } from 'next/router';
import { UrlObject } from 'url';
export { constructNextUrl, extractParamsOfConcern };

export const useNextRouter = () => {
	const _router = useRouter();
	const {
		settings: { storeToken },
	} = useSettings();
	const [_, setTrail] = useCookieState(BC_COOKIE, true, HC_PREFIX);

	const router = new Proxy(_router, {
		get: (target, prop: keyof NextRouter) => {
			if ((prop === 'push' || prop === 'replace') && typeof target[prop] === 'function') {
				const asPath = target['asPath'];
				return new Proxy(target[prop], {
					apply: (target, thisArg, argumentsList) => {
						const href = argumentsList[0];
						const newHref = constructNextUrl(asPath, href, storeToken) as UrlObject;
						const hasTrail = hasBreadcrumbTrail(newHref);
						const newTrail = hasTrail ? JSON.stringify((newHref.query as any)?.trail) : undefined;

						argumentsList[0] = hasTrail ? stripBreadcrumbQuery(newHref) : newHref;
						setTrail(newTrail); // update `trail` cookie

						if (argumentsList[1]) {
							// use explicitly specified as URL as-is with some adjustment for known parameters
							argumentsList[1] = constructNextUrl(asPath, argumentsList[1], storeToken);
						}

						return Reflect.apply(target, thisArg, argumentsList);
					},
				});
			} else if (prop === 'locale') {
				return switchOnMock({ value: target[prop], mockValue: DEFAULT_LOCALE });
			} else {
				return Reflect.get(target, prop);
			}
		},
	});
	return router;
};
