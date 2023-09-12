/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { PRODUCT_DATA_KEY, productFetcher } from '@/data/Content/_Product';
import { getContractIdParamFromContext, getSettings, useSettings } from '@/data/Settings';
import { getUser, useUser } from '@/data/User';
import { Cache } from '@/data/types/Cache';
import { ProductType } from '@/data/types/Product';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerCacheScope } from '@/data/utils/getServerCacheScope';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { expand, shrink } from '@/data/utils/keyUtil';
import { mapProductData } from '@/data/utils/mapProductData';
import { RequestParams } from 'integration/generated/query/http-client';
import { GetServerSidePropsContext } from 'next';
import useSWR, { unstable_serialize as unstableSerialize } from 'swr';

const DATA_KEY = PRODUCT_DATA_KEY;
type ProductFetchType = {
	product: ProductType | null;
};

const fetcher =
	(pub: boolean) =>
	async (
		query: {
			storeId: string;
			catalogId: string;
			[key: string]: string | boolean | (string | number)[];
		},
		params: RequestParams
	): Promise<ProductFetchType | undefined> => {
		const response = await productFetcher(pub)(query, params);
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
	const params = constructRequestParamsWithPreviewToken({ context });
	const cacheScope = getServerCacheScope(context, user.context);
	const value =
		(cache.get(key, cacheScope) as Promise<ProductFetchType | undefined>) ||
		fetcher(false)(query, params);
	cache.set(key, value, cacheScope);
	return (await value)?.product ?? undefined;
};

export const getProduct = async (
	map: Cache,
	partNumber: string,
	context: GetServerSidePropsContext
) => await getProductByKeyType(map, 'partNumber', partNumber, context);

// Maybe need to revisit and use id instead for consistency of cache and fallback
type Props = {
	id?: string;
	isCEId?: boolean;
	condition?: boolean;
	contractId?: string | string[];
};
export const useProduct = ({ id = '', isCEId = false, condition = true, contractId }: Props) => {
	const params = useExtraRequestParameters();
	const router = useNextRouter();
	const { settings } = useSettings();
	const { user } = useUser();
	const currentContract = getContractIdParamFromContext(user?.context);
	const contract = contractId ? { contractId } : currentContract;
	const {
		storeId,
		defaultCatalogId: catalogId,
		defaultCurrency: currency,
		langId,
	} = getClientSideCommon(settings, router);
	const idObj = { [isCEId ? 'id' : 'partNumber']: [id] };
	const { data, error, isLoading } = useSWR(
		storeId && id && condition
			? [
					shrink({
						storeId,
						...idObj,
						catalogId,
						langId,
						currency,
						...contract,
					}),
					DATA_KEY,
			  ]
			: null,
		async ([props]) => fetcher(true)(expand(props), params)
	);
	return {
		rawData: data,
		product: data?.product ?? undefined,
		loading: id && !error && isLoading && condition,
		error,
	};
};
