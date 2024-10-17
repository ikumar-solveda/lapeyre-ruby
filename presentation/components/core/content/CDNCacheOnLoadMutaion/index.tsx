/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { personMutatorKeyMatcher } from '@/data/Content/Login';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useLocalization } from '@/data/Localization';
import { useSettings } from '@/data/Settings';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { FetchOptionsType, ProcessedFetchOption } from '@/data/types/customerService';
import { isCDNCacheableRoute } from '@/utils/isCDNCacheableRoute';
import { cartMutatorKeyMatcher } from '@/utils/mutatorKeyMatchers';
import { FC, useEffect, useMemo } from 'react';
import { mutate } from 'swr';
declare global {
	interface Window {
		parentIFrame: any;
		iFrameResizer: any;
		processFetchOptions: (props: FetchOptionsType) => ProcessedFetchOption;
	}
}

/**
 * Trigger mutation of User related data that skipped by CDN cache logic
 */
export const CDNCacheOnloadMutation: FC = () => {
	const { settings } = useSettings();
	const routes = useLocalization('Routes');
	const {
		query: { path },
	} = useNextRouter();
	const { csrSession } = settings;

	const isCacheableRoute = useMemo(
		() => isCDNCacheableRoute({ path, settings, routes }),
		[path, routes, settings]
	);
	useEffect(() => {
		if (!csrSession && isCacheableRoute) {
			const setupSession = async () => {
				await mutate(personMutatorKeyMatcher(EMPTY_STRING), undefined, { populateCache: false });
				mutate(cartMutatorKeyMatcher(EMPTY_STRING), undefined, { populateCache: false });
			};
			setupSession(); // always mutate, because of CDN cache
		}
	}, [isCacheableRoute, csrSession]);
	return null;
};
