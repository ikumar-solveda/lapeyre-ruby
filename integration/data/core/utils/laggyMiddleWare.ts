/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useCallback, useEffect, useRef } from 'react';
import { Middleware, SWRHook } from 'swr';

// This is a SWR middleware for keeping the data even if key changes.
export const laggyMiddleWare: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config) => {
	// Use a ref to store previous returned data.
	const laggyDataRef = useRef<any>();

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
