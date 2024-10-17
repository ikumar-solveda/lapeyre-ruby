/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { DATA_KEY_CURRENCY_FORMAT } from '@/data/constants/dataKey';
import { fetcher } from '@/data/Content/_CurrencyFormat';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyFromContext } from '@/data/utils/getCurrencyFromContext';
import { expand, shrink } from '@/data/utils/keyUtil';
import { useMemo } from 'react';
import useSWR from 'swr';

export const useCurrencyFormat = (currency?: string) => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const { storeId } = getClientSideCommon(settings, router);

	const { user } = useUser();
	const resolvedCurrency = useMemo(
		() => currency || getCurrencyFromContext(user?.context),
		[currency, user]
	);
	const { data, error } = useSWR(
		storeId
			? [shrink({ storeId, query: { currency: resolvedCurrency } }), DATA_KEY_CURRENCY_FORMAT]
			: null,
		async ([props]) => {
			const expanded = expand<Record<string, any>>(props);
			const { storeId, query } = expanded;
			return fetcher(true)(storeId, query);
		}
	);
	return {
		decimalPlaces: data,
		loading: !error && !data,
		error,
	};
};
