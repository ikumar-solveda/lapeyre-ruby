/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { getStoreLocale } from '@/data/Content/StoreLocale-Server';
import { getLocalization } from '@/data/Localization-Server';
import { dDiv, dFix, getSettings } from '@/data/Settings-Server';
import { SKIP_ERROR_LOGGING } from '@/data/constants/common';
import { DATA_KEY_CART } from '@/data/constants/dataKey';
import { ORDER_CONFIGS } from '@/data/constants/order';
import { ID } from '@/data/types/Basic';
import { ContentProps } from '@/data/types/ContentProps';
import { Order } from '@/data/types/Order';
import { constructRequestParamsWithPreviewToken } from '@/data/utils/constructRequestParams';
import { getServerSideCommon } from '@/data/utils/getServerSideCommon';
import { shrink } from '@/data/utils/keyUtil';
import { error as logError } from '@/data/utils/loggerUtil';
import { transactionsCart } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';
import { unstable_serialize as unstableSerialize } from 'swr';

export const DATA_KEY = DATA_KEY_CART;

type FullFetcherProps = {
	storeId: string;
	query: Record<string, string | boolean | ID[]>;
	params: RequestParams;
};
const fetcherFull = (pub: boolean) => async (props: FullFetcherProps) => {
	const { storeId, query, params } = props;
	let totalPages = 1;

	const cart = await (transactionsCart(pub).cartGetCart(
		storeId,
		query,
		params
	) as Promise<unknown> as Promise<Order>);

	const { recordSetCount, recordSetTotal, orderItem = [] } = cart;
	const pageSize = dFix(recordSetCount, 0);
	if (pageSize < dFix(recordSetTotal, 0)) {
		totalPages = dFix(Math.ceil(dDiv(recordSetTotal, pageSize)), 0);
	}

	if (totalPages > 1) {
		// generate fetches for remaining pages
		const fetches = Array.from(
			{ length: totalPages - 1 },
			(_empty, index) =>
				transactionsCart(pub).cartGetCart(
					storeId,
					{ ...query, pageNumber: index + 2, pageSize },
					params
				) as Promise<unknown> as Promise<Order>
		);

		// fetch remaining pages concurrently
		const pages = await Promise.all(fetches);

		// collect all order-items
		const allItems = [...orderItem, ...pages.map(({ orderItem }) => orderItem).flat(1)];

		// update the container
		cart.orderItem = allItems;
	}

	return cart;
};

export const fetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	/**
	 * The data fetcher for cart
	 * @param query The request query.
	 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
	 *                                  we are using it to send cookie header.
	 * @returns Fetched cart data.
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
			return await fetcherFull(pub)({
				storeId,
				query,
				params: { skipErrorLogging: SKIP_ERROR_LOGGING, ...params },
			});
		} catch (error: any) {
			if (error.status === 404) {
				return {} as Order;
			}
			logError(context?.req, '_Cart: fetcher: error: %o', error);
			if (pub) {
				throw error;
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
	const { localeName: locale } = await getStoreLocale({ cache, context });
	const routes = await getLocalization(cache, locale, 'Routes');
	await Promise.all([
		getLocalization(cache, locale, 'Cart'),
		getLocalization(cache, locale, 'FreeGift'),
		getLocalization(cache, locale, 'OrderItemTable'),
	]);

	const { storeId, langId } = getServerSideCommon(settings, context);
	const props = { storeId, query: { langId, sortOrder: 'desc' } };
	const key = unstableSerialize([shrink(props), DATA_KEY]);
	const params: RequestParams = constructRequestParamsWithPreviewToken({
		context,
		settings,
		routes,
	});
	const value = cache.get(key) || fetcher(false, context)(props.storeId, props.query, params);
	cache.set(key, value);
	return await value;
};

export const orderCopier =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		fromOrderId: fromOrderId_1,
		storeId,
		langId,
		query = {},
		params,
	}: {
		fromOrderId: string;
		storeId: string;
		langId: string;
		query: { responseFormat?: 'xml' | 'json' } | undefined;
		params: RequestParams;
	}) => {
		const data = {
			fromOrderId_1,
			toOrderId: '.**.',
			copyOrderItemId_1: '*',
		};
		try {
			await transactionsCart(pub).cartCopyOrder(storeId, query, data, params);
			return await fetcher(pub)(storeId, { langId }, params);
		} catch (e) {
			logError(context?.req, 'Error in copying order %o', e);
			if (pub) {
				throw e;
			}
			// currently, we do not want to break the server with error
			return undefined;
		}
	};

export const cartCalculator =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		query = {},
		params,
	}: {
		storeId: string;
		query?: { responseFormat?: 'xml' | 'json' };
		params: RequestParams;
	}) => {
		try {
			const calculationUsageId: any = ORDER_CONFIGS.calculationUsage.split(',');
			return await transactionsCart(pub).cartCalculateOrder1(
				storeId,
				query,
				{ calculationUsageId },
				params
			);
		} catch (e) {
			logError(context?.req, 'Error in calculating order %o', e);
			if (pub) {
				throw e;
			}
			// currently, we do not want to break the server with error
			return undefined;
		}
	};

export const cartUpdateRewardOption =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: boolean | ID | ID[] | string;
		} = {},
		data: any, // the spec is wrong
		params: RequestParams
	) =>
		await transactionsCart(pub).cartUpdateRewardOption(storeId, query, data, params);

/**
 * Fetch cart summary, used for get cart total.
 * @param pub
 * @param context
 * @returns
 */
export const cartSummaryFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	/**
	 * The data fetcher for cart summary
	 * @param query The request query.
	 * @param params The RequestParams, it contains all the info that a request needed except for 'body' | 'method' | 'query' | 'path'.
	 *                                  we are using it to send cookie header.
	 * @returns Fetched cart data.
	 */
	async (storeId: string, params: RequestParams): Promise<Order | undefined> => {
		try {
			return await (transactionsCart(pub).cartGetCart(
				storeId,
				{ profileName: 'IBM_Summary' },
				params
			) as Promise<unknown> as Promise<Order>);
		} catch (e) {
			logError(context?.req, 'Error in calculating order %o', e);
			if (pub) {
				throw e;
			}
			// currently, we do not want to break the server with error
			return undefined;
		}
	};
