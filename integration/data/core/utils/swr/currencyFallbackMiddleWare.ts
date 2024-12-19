/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { expand, shrink } from '@/data/utils/keyUtil';
import { Middleware, SWRHook } from 'swr';

const buildDefaultCurrencyKey = (key: unknown, defaultCurrency: string) => {
	if (key === null) {
		return key;
	}
	const [props, ...rest] = key as readonly [any, ...unknown[]];
	const expandedProps = expand(props) as any;
	if (expandedProps.currency === defaultCurrency) {
		return null; // No need to fetch default currency again.
	} else {
		expandedProps.currency = defaultCurrency;
		return [shrink(expandedProps as any), ...rest];
	}
};
/**
 * The middleware is trying to fallback to store default currency when data not available for the current currency.
 * to another with non-default currency in context.
 * The page flash is caused by below reasons:
 * Since we are not getting the proper user context at server side for CDN cache purposes, as the result,
 * we are using the default currency at the server side.
 */
export const currencyFallbackMiddleWare =
	({ defaultCurrency }: { defaultCurrency: string }): Middleware =>
	(useSWRNext: SWRHook) =>
	(key, fetcher, config) => {
		const swr_currency = useSWRNext(buildDefaultCurrencyKey(key, defaultCurrency), fetcher, config);
		// Actual SWR hook.
		const swr = useSWRNext(key, fetcher, config);

		// Fallback to default currency data if the current data is undefined.
		const dataOrCurrencyFallback = swr.data === undefined ? swr_currency.data : swr.data;

		// Is it showing previous data?
		const isCurrencyFallback = swr.data === undefined && swr_currency.data !== undefined;

		// Also add a `isCurrencyFallback` field to SWR.
		return Object.assign({}, swr, {
			data: dataOrCurrencyFallback,
			isCurrencyFallback,
		});
	};
