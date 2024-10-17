/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { productFetcher as fetcher } from '@/data/Content/_Product';
import { getLocalization } from '@/data/Localization';
import { getContractIdParamFromContext, getSettings } from '@/data/Settings';
import { getUser } from '@/data/User';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { DATA_KEY_PRODUCT_MULTI } from '@/data/constants/dataKey';
import { ContentProps } from '@/data/types/ContentProps';
import { ProductQueryResponse } from '@/data/types/Product';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getCurrencyParamFromContext } from '@/data/utils/getCurrencyParamFromContext';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { shrink } from '@/data/utils/keyUtil';
import { unstable_serialize as unstableSerialize } from 'swr';

export const getProductMulti = async (
	{ cache, context }: ContentProps,
	products: string[]
): Promise<ProductQueryResponse> => {
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const { localeName: locale } = await getStoreLocale({ cache, context });
	const { storeId, langId, defaultCatalogId: catalogId } = getServerSideCommon(settings, context);
	const routes = await getLocalization(cache, locale, 'Routes');
	const props = {
		storeId,
		partNumber: products,
		catalogId,
		langId,
		...getContractIdParamFromContext(user?.context),
		...getCurrencyParamFromContext(user?.context),
	};
	const cacheScope = getServerCacheScope(context, user.context);
	const key = unstableSerialize([shrink(props), DATA_KEY_PRODUCT_MULTI]);
	const params = constructRequestParamsWithPreviewToken({ context, settings, routes });
	const value = cache.get(key, cacheScope) || fetcher(false, context)(props, params);
	cache.set(key, value, cacheScope);

	return value;
};
