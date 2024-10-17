/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { DATA_KEY_CURRENCY_FORMAT } from '@/data/constants/dataKey';
import { fetcher } from '@/data/Content/_CurrencyFormat';
import { getSettings } from '@/data/Settings-Server';
import { Cache } from '@/data/types/Cache';
import { getUser } from '@/data/User-Server';
import { getCurrencyFromContext } from '@/data/utils/getCurrencyFromContext';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { shrink } from '@/data/utils/keyUtil';
import { GetServerSidePropsContext } from 'next';
import { unstable_serialize } from 'swr';

export const getCurrencyFormat = async (
	cache: Cache,
	context: GetServerSidePropsContext
): Promise<string | undefined> => {
	const settings = await getSettings(cache, context);
	const { storeId } = getServerSideCommon(settings, context);
	const user = await getUser(cache, context);
	const currency = getCurrencyFromContext(user?.context);
	const props = { storeId, query: { currency } };
	const key = unstable_serialize([shrink(props), DATA_KEY_CURRENCY_FORMAT]);
	const cacheScope = { requestScope: false };
	const value = cache.get(key, cacheScope) ?? fetcher(false)(props.storeId, props.query as any);
	cache.set(key, value, cacheScope);
	return await value;
};
