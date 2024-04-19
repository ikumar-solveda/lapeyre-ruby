/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useSettings } from '@/data/Settings';
import { DEFAULT_LOCALE } from '@/data/config/DEFAULTS';
import { constructNextUrl } from '@/data/utils/constructNextUrl';
import { extractParamsOfConcern } from '@/data/utils/extractParamsOfConcern';
import { switchOnMock } from '@/data/utils/switchOnMock';
// this is the only place importing useRouter from 'next/router'
// eslint-disable-next-line no-restricted-imports
import { NextRouter, useRouter } from 'next/router';
export { constructNextUrl, extractParamsOfConcern };

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
			} else if (prop === 'locale') {
				return switchOnMock({ value: target[prop], mockValue: DEFAULT_LOCALE });
			} else {
				return Reflect.get(target, prop);
			}
		},
	});
	return router;
};
