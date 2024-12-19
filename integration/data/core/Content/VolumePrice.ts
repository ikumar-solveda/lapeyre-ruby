/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { priceListMapper, volumePriceListFetcher } from '@/data/Content/_VolumePrice';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_PRICE } from '@/data/constants/dataKey';
import { PriceResponse } from '@/data/types/Price';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getCurrencyFromContext } from '@/data/utils/getCurrencyFromContext';
import { expand, shrink } from '@/data/utils/keyUtil';
import { useMemo } from 'react';
import useSWR from 'swr';

type Props = {
	partNumber: string[];
};

export const useVolumePrice = ({ partNumber }: Props) => {
	const router = useNextRouter();
	const { settings } = useSettings();
	const { user } = useUser();
	const { defaultCurrency } = settings;
	const { storeId } = getClientSideCommon(settings, router);
	const params = useExtraRequestParameters();
	const currency = useMemo(
		() => getCurrencyFromContext(user?.context) ?? defaultCurrency,
		[defaultCurrency, user?.context]
	);

	const {
		data,
		error,
		isLoading,
		mutate: mutateRangePriceList,
	} = useSWR(
		storeId && partNumber
			? [
					shrink({ storeId, query: { partNumber, currency } as Record<string, any> }),
					DATA_KEY_PRICE,
			  ]
			: null,
		async ([props]) => {
			const expanded = expand<Record<string, any>>(props);
			const { storeId, query } = expanded;
			return volumePriceListFetcher(true)(storeId, query, params);
		}
	);

	const { entitledPriceList, rangePriceList } = useMemo(
		() => priceListMapper(data as PriceResponse),
		[data]
	);

	return {
		data,
		error,
		isLoading,
		mutateRangePriceList,
		entitledPriceList,
		rangePriceList,
	};
};
