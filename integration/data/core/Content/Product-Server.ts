/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { PRODUCT_DATA_KEY, productFetcher } from '@/data/Content/_Product';
import { getLocalization } from '@/data/Localization-Server';
import { getContractIdParamFromContext, getSettings } from '@/data/Settings-Server';
import { getUser } from '@/data/User-Server';
import { getServerCacheScope } from '@/data/cache/getServerCacheScope';
import { Cache } from '@/data/types/Cache';
import { ProductType } from '@/data/types/Product';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { shrink } from '@/data/utils/keyUtil';
import { mapProductData } from '@/data/utils/mapProductData';
import { RequestParams } from 'integration/generated/query/http-client';
import { GetServerSidePropsContext } from 'next';
import { unstable_serialize as unstableSerialize } from 'swr';

const DATA_KEY = PRODUCT_DATA_KEY;
type ProductFetchType = {
	product: ProductType | null;
};

export const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		query: {
			storeId: string;
			catalogId: string;
			[key: string]: string | boolean | (string | number)[];
		},
		params: RequestParams
	): Promise<ProductFetchType | undefined> => {
		const response = await productFetcher(pub, context)(query, params);
		const product = extractContentsArray(response).at(0);
		return response ? { product: product ? mapProductData(product) : null } : response;
	};

export const getProductByKeyType = async (
	cache: Cache,
	lookupKey: string,
	lookupValue: string,
	context: GetServerSidePropsContext
) => {
	const settings = await getSettings(cache, context);
	const user = await getUser(cache, context);
	const routes = await getLocalization(cache, context.locale || 'en-US', 'Routes');
	const {
		storeId,
		langId,
		defaultCatalogId: catalogId,
		defaultCurrency: currency,
	} = getServerSideCommon(settings, context);
	const query = {
		storeId,
		[lookupKey]: [lookupValue],
		catalogId,
		langId,
		currency,
		...getContractIdParamFromContext(user?.context),
	};
	const key = unstableSerialize([shrink(query), DATA_KEY]);
	const params = constructRequestParamsWithPreviewToken({ context, settings, routes });
	const cacheScope = getServerCacheScope(context, user.context);
	const value =
		(cache.get(key, cacheScope) as Promise<ProductFetchType | undefined>) ||
		fetcher(false, context)(query, params);
	cache.set(key, value, cacheScope);
	return (await value)?.product ?? undefined;
};

export const getProduct = async (
	map: Cache,
	partNumber: string,
	context: GetServerSidePropsContext
) => await getProductByKeyType(map, 'partNumber', partNumber, context);
