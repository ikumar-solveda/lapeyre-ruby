/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */
import { pagesUrlFetcher } from '@/data/Content/_Page';
import { getSettings } from '@/data/Settings-Server';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { DATA_KEY_PAGES_URL } from '@/data/constants/dataKey';
import { ContentProps } from '@/data/types/ContentProps';
import { StoreURLKeyword } from '@/data/types/URLKeyword';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { findSAS } from '@/data/utils/findSASStoreId';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { shrink } from '@/data/utils/keyUtil';
import { Dictionary } from 'lodash';
import { unstable_serialize } from 'swr';

export const getStaticPagesURL = async ({ cache, context }: ContentProps) => {
	const settings = await getSettings(cache, context);
	const params = constructRequestParamsWithPreviewToken({ context, settings });
	const { langId, storeId } = getServerSideCommon(settings, context);
	const sasStoreId = findSAS(settings);
	const props = { storeId, sasStoreId, langId };

	const key = unstable_serialize([shrink(props as any), DATA_KEY_PAGES_URL]);
	const cacheScope = getServerCacheScope(context);
	const value =
		(cache.get(key, cacheScope) as Promise<
			| Dictionary<
					StoreURLKeyword & {
						name: string;
						id: string;
					}
			  >
			| undefined
		>) || pagesUrlFetcher(false)({ ...props, params });
	cache.set(key, value, cacheScope);
	return await value;
};
