/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { DATA_KEY_PRODUCT } from '@/data/constants/dataKey';
import { ID } from '@/data/types/Basic';
import { ProductQueryResponse, ResponseProductType } from '@/data/types/Product';
import { extractContentsArray } from '@/data/utils/extractContentsArray';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { RequestParams } from 'integration/generated/query/http-client';
import queryV2ProductResource from 'integration/generated/query/queryV2ProductResource';
import { GetServerSidePropsContext } from 'next';

export const PRODUCT_DATA_KEY = DATA_KEY_PRODUCT;

export const productFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	/**
	 * The data fetcher for Product.
	 * @param query The request query
	 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
	 *                                  we are using it to send cookie header.
	 * @returns Fetched Product data.
	 */
	async (
		{
			categoryId,
			...query
		}: {
			storeId: string;
			categoryId?: string;
			[key: string]: string | boolean | ID[] | number | undefined;
		},
		params: RequestParams
	): Promise<ProductQueryResponse | undefined> => {
		try {
			return (await queryV2ProductResource(pub).findProducts(
				categoryId
					? {
							...query,
							categoryId,
					  }
					: query,
				params
				// the spec is not accurate.
			)) as Promise<ProductQueryResponse>;
		} catch (error) {
			errorWithId(getRequestId(context), '_Product: productFetcher: error: %o', { error });
			// on client-side, this is a legitimate error (most likely an indicated session-error) --
			//   throw it and we can try to handle it
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};

export const productOfSkuFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		query: {
			storeId: string;
			catalogId: string;
			[key: string]: string | boolean | (string | number)[];
		},
		params: RequestParams
	) => {
		try {
			const response = await productFetcher(pub, context)(query, params);
			const sku: ResponseProductType[] = extractContentsArray(response);
			const id = Object.keys(
				sku.reduce((acc, { parentCatalogEntryID: k }) => ({ ...acc, ...(k && { [k]: 1 }) }), {})
			);
			const { partNumber, id: _id, ...rest } = query;
			const res = await productFetcher(pub, context)({ ...rest, id }, params);

			// find pure SKUs, e.g., category-level SKU or Kit, without parents and attach to self
			const rc = sku
				.filter(({ parentCatalogEntryID }) => !parentCatalogEntryID)
				.map((sku) => ({ ...sku, items: [sku] }));

			// inject products with hierarchy at the end
			rc.push(...(extractContentsArray(res) as ResponseProductType[]));

			return rc;
		} catch (error) {
			errorWithId(getRequestId(context), '_Product: productOfSkuFetcher: error: %o', { error });
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};
