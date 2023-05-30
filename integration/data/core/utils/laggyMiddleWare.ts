/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useRef, useEffect, useCallback } from 'react';
import { SWRHook, BareFetcher, SWRConfiguration, Key, Middleware } from 'swr';
import { defaultConfig } from 'swr/_internal';

// This is a SWR middleware for keeping the data even if key changes.
export const laggyMiddleWare: Middleware =
	(useSWRNext: SWRHook) =>
	<Data = any, Error = any>(
		key: Key,
		fetcher: BareFetcher<Data> | null,
		config: typeof defaultConfig & SWRConfiguration<Data, Error, BareFetcher<Data>>
	) => {
		// Use a ref to store previous returned data.
		const laggyDataRef = useRef<Data>();

		// Actual SWR hook.
		const swr = useSWRNext(key, fetcher, config);

		useEffect(() => {
			// Update ref if data is not undefined.
			if (swr.data !== undefined) {
				laggyDataRef.current = swr.data;
			}
		}, [swr.data]);

		// Expose a method to clear the laggy data, if any.
		const resetLaggy = useCallback(() => {
			laggyDataRef.current = undefined;
		}, []);

		// Fallback to previous data if the current data is undefined.
		const dataOrLaggyData = swr.data === undefined ? laggyDataRef.current : swr.data;

		// Is it showing previous data?
		const isLagging = swr.data === undefined && laggyDataRef.current !== undefined;

		// Also add a `isLagging` field to SWR.
		return Object.assign({}, swr, {
			data: dataOrLaggyData,
			isLagging,
			resetLaggy,
		});
	};
