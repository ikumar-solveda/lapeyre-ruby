/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getSettings } from '@/data/Settings';
import { DATA_KEY_STORE_URL_KEYWORD, fetcher } from '@/data/_StoreURLKeyword';
import { Cache } from '@/data/types/Cache';
import { StoreURLKeyword } from '@/data/types/URLKeyword';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { shrink } from '@/data/utils/keyUtil';
import { GetServerSidePropsContext } from 'next';
import { unstable_serialize as unstableSerialize } from 'swr';

export const getStoreURLKeyword = async (cache: Cache, context: GetServerSidePropsContext) => {
	const settings = await getSettings(cache, context);
	const { storeId, langId: languageId, defaultLanguage } = getServerSideCommon(settings, context);
	const props = {
		tokenValue: `${storeId}:`,
		languageId,
		defaultLanguage,
	};
	const key = unstableSerialize([shrink(props as any), DATA_KEY_STORE_URL_KEYWORD]);
	const cacheScope = { requestScope: false };
	const value =
		(cache.get(key, cacheScope) as Promise<StoreURLKeyword | undefined>) ||
		fetcher(false, context)(props);
	cache.set(key, value, cacheScope);
	return value;
};
