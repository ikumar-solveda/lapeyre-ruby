/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import {
	DATA_KEY_E_SPOT_DATA_FROM_NAME,
	DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC,
} from '@/data/constants/dataKey';
import { useMemo } from 'react';
import { Middleware, SWRHook, unstable_serialize } from 'swr';

/**
 * Middleware to handle dynamic eSpot
 */
export const marketingSpotMiddleWare: Middleware =
	(useSWRNext: SWRHook) => (key, fetcher, config) => {
		const serializedKey = unstable_serialize(key);
		// Actual SWR hook.
		const swr = useSWRNext(key, fetcher, config);
		const behaveDynamic = (swr.data as any)?.MarketingSpotData?.at(0)?.behavior === '1';
		const dynamicKey = useMemo(
			() =>
				behaveDynamic && Array.isArray(key) && key.at(-1) === DATA_KEY_E_SPOT_DATA_FROM_NAME
					? key.toSpliced(-1, 1, DATA_KEY_E_SPOT_DATA_FROM_NAME_DYNAMIC)
					: key,
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[behaveDynamic, serializedKey]
		);
		const dynamicConfig = useMemo(
			() => (behaveDynamic ? { ...config, revalidateIfStale: true } : config),
			[behaveDynamic, config]
		);

		const normalizedKey = useMemo(() => dynamicKey ?? key, [dynamicKey, key]);
		const swr2 = useSWRNext(normalizedKey, fetcher, dynamicConfig);

		return swr2;
	};
