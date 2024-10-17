/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { orderByIdFetcherFull } from '@/data/Content/_Order';
import { getLocalization } from '@/data/Localization-Server';
import { getContractIdParamFromContext, getSettings } from '@/data/Settings-Server';
import { getUser } from '@/data/User-Server';
import { DATA_KEY_ORDER_BY_ID } from '@/data/constants/dataKey';
import { Cache } from '@/data/types/Cache';
import { Order } from '@/data/types/Order';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { GetServerSidePropsContext } from 'next';
import { unstable_serialize as unstableSerialize } from 'swr';

type Props = {
	orderId: string;
	cache: Cache;
	context: GetServerSidePropsContext;
};
export const getOrderHistoryDetails = async ({ orderId, cache, context }: Props) => {
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const { localeName: locale } = await getStoreLocale({ cache, context });
	const routes = await getLocalization(cache, locale, 'Routes');
	const { storeId, langId } = getServerSideCommon(settings, context);
	const query = { langId, ...getContractIdParamFromContext(user?.context) };
	const params = constructRequestParamsWithPreviewToken({ context, settings, routes });
	const props = { storeId, orderId, query, params };
	const cacheScope = { requestScope: true }; // user-data
	const key = unstableSerialize([props, DATA_KEY_ORDER_BY_ID]);
	let res: Promise<Order> = cache.get(key, cacheScope);
	if (!res) {
		res = orderByIdFetcherFull(false, context)(props);
		cache.set(key, res, cacheScope);
	}
	const value = await res;
	return value;
};
