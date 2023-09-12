/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { ID } from '@/data/types/Basic';
import { ProductQueryResponse } from '@/data/types/Product';
import { queryV2ProductResource } from 'integration/generated/query';
import { RequestParams } from 'integration/generated/query/http-client';

export const PRODUCT_DATA_KEY = 'Product';

export const productFetcher =
	(pub: boolean) =>
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
			console.log(error);
			// on client-side, this is a legitimate error (most likely an indicated session-error) --
			//   throw it and we can try to handle it
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};
