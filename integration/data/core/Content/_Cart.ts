/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { unstable_serialize as unstableSerialize } from 'swr';
import { getSettings } from '@/data/Settings';
import { ID } from '@/data/types/Basic';
import { transactionsCart } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { Order } from '@/data/types/Order';
import { ContentProps } from '@/data/types/ContentProps';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';

export const DATA_KEY = 'cart';
export const fetcher =
	(pub: boolean) =>
	/**
	 * The data fetcher for Category
	 * @param query The request query.
	 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
	 *                                  we are using it to send cookie header.
	 * @returns Fetched Category data.
	 */
	async (
		storeId: string,
		query: {
			langId: string;
			[key: string]: string | boolean | ID[];
		},
		params: RequestParams
	): Promise<Order | undefined> => {
		try {
			return await (transactionsCart(pub).cartGetCart(
				storeId,
				query,
				params
			) as Promise<unknown> as Promise<Order>);
		} catch (error: any) {
			if (error.status === 404) {
				return {} as Order;
			} else {
				console.log(error);
			}
			return undefined;
		}
	};

export const getCart = async ({
	cache,
	id: _id,
	context,
}: ContentProps): Promise<Order | undefined> => {
	const settings = await getSettings(cache, context);
	const { storeId, langId } = getServerSideCommon(settings, context);
	const props = { storeId, query: { langId, sortOrder: 'desc' } };
	const key = unstableSerialize([props, DATA_KEY]);
	const params: RequestParams = constructRequestParamsWithPreviewToken({ context });
	const value = cache.get(key) || fetcher(false)(props.storeId, props.query, params);
	cache.set(key, value);
	return await value;
};
