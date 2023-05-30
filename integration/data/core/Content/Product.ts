/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import useSWR, { unstable_serialize as unstableSerialize } from 'swr';
import { getSettings, useSettings } from '@/data/Settings';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { ProductQueryResponse, ProductType } from '@/data/types/Product';
import { productFetcher, PRODUCT_DATA_KEY } from '@/data/Content/_Product';
import { mapProductData } from '@/data/utils/mapProductData';
import { GetServerSidePropsContext } from 'next';
import { RequestParams } from 'integration/generated/query/http-client';
import { Cache } from '@/data/types/Cache';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';

const DATA_KEY = PRODUCT_DATA_KEY;
type ProductFetchType = {
	product: ProductType | null;
	response: ProductQueryResponse | undefined;
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
		return response ? { product: product ? mapProductData(product) : null, response } : response;
	};

export const getProductByKeyType = async (
	cache: Cache,
	lookupKey: string,
	lookupValue: string,
	context: GetServerSidePropsContext
) => {
	const settings = await getSettings(cache, context);
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
	};
	const key = unstableSerialize([query, DATA_KEY]);
	const params = constructRequestParamsWithPreviewToken({ context });
	const value = cache.get(key) || fetcher(false)(query, params);
	cache.set(key, value);
	return (await value)?.product ?? undefined;
};

export const getProduct = async (
	map: Cache,
	partNumber: string,
	context: GetServerSidePropsContext
) => await getProductByKeyType(map, 'partNumber', partNumber, context);

// Maybe need to revisit and use id instead for consistence of cache and fallback
export const useProduct = ({ id = '', isCEId = false, condition = true }) => {
	const params = useExtraRequestParameters();
	const router = useNextRouter();
	const { settings } = useSettings();
	const {
		storeId,
		defaultCatalogId: catalogId,
		defaultCurrency: currency,
		langId,
	} = getClientSideCommon(settings, router);
	const idObj = { [isCEId ? 'id' : 'partNumber']: [id] };
	const { data, error, isLoading } = useSWR(
		storeId && id && condition
			? [{ storeId, ...idObj, catalogId, langId, currency }, DATA_KEY]
			: null,
		async ([props]) => fetcher(true)(props, params)
	);
	return {
		product: data?.product ?? undefined,
		loading: id && !error && isLoading && condition,
		error,
	};
};
