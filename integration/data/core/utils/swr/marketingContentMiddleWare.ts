/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useUser } from '@/data/User';
import { DATA_KEY_E_SPOT_DATA_FROM_NAME } from '@/data/constants/dataKey';
import { useEffect, useRef, useState } from 'react';
import { Key, Middleware, SWRHook, unstable_serialize } from 'swr';

const swrConfigRevalidate = {
	revalidateIfStale: true,
};

const findIndexToInsert = (key: Key, userId: string) => {
	if (Array.isArray(key)) {
		const atEnd = key.at(-1);
		if (atEnd === DATA_KEY_E_SPOT_DATA_FROM_NAME) {
			return key.at(-2) === userId ? undefined : -1;
		} else if (atEnd === userId) {
			return undefined;
		} else {
			return key.length;
		}
	} else {
		return undefined;
	}
};

/**
 * Middleware to handle dynamic eSpot
 */
export const marketingSpotMiddleWare: Middleware =
	(useSWRNext: SWRHook) => (key, fetcher, config) => {
		const user = useUser();
		const userId = user.user?.userId;
		const configRef = useRef<boolean>(false);
		const [normalizedConfig, setNormalizedConfig] = useState(config);
		const [normalizedKey, setNormalizedKey] = useState(key);
		const serializedKey = unstable_serialize(key);
		// Actual SWR hook.
		const swr = useSWRNext(normalizedKey, fetcher, normalizedConfig);
		const behaveDynamic = (swr.data as any)?.MarketingSpotData?.at(0)?.behavior === '1';

		useEffect(() => {
			// Update ref if current is undefined.
			if (!configRef.current) {
				if (behaveDynamic) {
					// config only need to update once
					setNormalizedConfig((pre) => ({ ...pre, ...swrConfigRevalidate }));
				}
				configRef.current = true;
			}
			const index = findIndexToInsert(key, String(userId));
			if (behaveDynamic && Array.isArray(key) && index !== undefined) {
				setNormalizedKey(key.toSpliced(index, 0, userId));
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [serializedKey, behaveDynamic, userId]); // use serialized string key instead of array object as key in deps to avoid rendering.
		return swr;
	};
