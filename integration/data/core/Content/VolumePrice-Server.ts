/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { DATA_KEY_PRICE } from '@/data/constants/dataKey';
import { priceListMapper, volumePriceListFetcher } from '@/data/Content/_VolumePrice';
import { getSettings } from '@/data/Settings-Server';
import { ContentProps } from '@/data/types/ContentProps';
import { getUser } from '@/data/User-Server';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { getServerCacheScope } from '@/data/utils/getServerCacheScope';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { shrink } from '@/data/utils/keyUtil';
import { unstable_serialize as unstableSerialize } from 'swr';

export const getVolumePrice = async ({ cache, id: partNumber, context }: ContentProps) => {
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const { storeId } = getServerSideCommon(settings, context);
	const params = constructRequestParamsWithPreviewToken({ context, settings });
	const props = {
		storeId,
		query: {
			partNumber: Array.isArray(partNumber) ? partNumber : [partNumber.toString()],
			...getCurrencyParamFromContext(user?.context),
		},
	};
	const cacheScope = getServerCacheScope(context);
	const key = unstableSerialize([shrink(props), DATA_KEY_PRICE]);
	const value =
		cache.get(key, cacheScope) ||
		volumePriceListFetcher(false, context)(storeId, props.query, params);
	cache.set(key, value, cacheScope);
	return priceListMapper(await value);
};
