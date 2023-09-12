/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { dDiv, dFix } from '@/data/Settings';
import { Order } from '@/data/types/Order';
import { RequestQuery } from '@/data/types/RequestQuery';
import { transactionsOrder } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';

export const STATUSES = 'N,M,A,B,C,R,S,D,F,G,L,W,APP,RTN';

type RequestQueryForOrders = RequestQuery & {
	orderType?: 'private' | 'shared' | 'all';
	pageNumber?: number;
	pageSize?: number;
	currency?: string;
	sortOrderItemBy?:
		| 'orderItemID'
		| 'createDate'
		| 'quantity'
		| 'inventoryStatus'
		| 'price'
		| 'unitPrice'
		| 'partNumber';
	sortOrder?: 'ASC' | 'DESC';
};

type FullFetcherProps = {
	orderId: string;
	storeId: string;
	query?: RequestQueryForOrders;
	params: RequestParams;
};
export const orderByIdFetcherFull = (pub: boolean) => async (props: FullFetcherProps) => {
	const { orderId, storeId, query, params } = props;
	let totalPages = 1;

	const order = await (transactionsOrder(pub).orderFindByOrderId(
		orderId,
		storeId,
		query,
		params
	) as Promise<unknown> as Promise<Order>);

	const { recordSetCount, recordSetTotal, orderItem = [] } = order;
	const pageSize = dFix(recordSetCount, 0);
	if (pageSize < dFix(recordSetTotal, 0)) {
		totalPages = dFix(Math.ceil(dDiv(recordSetTotal, pageSize)), 0);
	}

	if (totalPages > 1) {
		// generate fetches for remaining pages
		const fetches = Array.from(
			{ length: totalPages - 1 },
			(_empty, index) =>
				transactionsOrder(pub).orderFindByOrderId(
					orderId,
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
		order.orderItem = allItems;
	}

	return order;
};

export const orderByIdFetcher =
	(pub: boolean, throwError = true) =>
	async (storeId: string, orderId: string, query: RequestQuery = {}, params: RequestParams) => {
		try {
			return await transactionsOrder(pub).orderFindByOrderId(orderId, storeId, query, params);
		} catch (e) {
			if (throwError) {
				throw e;
			} else {
				// for things like filter-by-order-id, we don't really care if an order wasn't found as the
				//   table display being empty will confirm this
				return undefined;
			}
		}
	};

export const ordersByStatus =
	(pub: boolean) =>
	async (
		storeId: string,
		statusCSV: string = STATUSES,
		query: RequestQueryForOrders = {},
		params: RequestParams
	) => {
		try {
			return await transactionsOrder(pub).orderFindByStatus(storeId, statusCSV, query, params);
		} catch (e) {
			if (pub) {
				console.log('Error in getting order details find by status service call', e);
				throw e;
			}
			// currently, we do not want to break the server with error
			return undefined;
		}
	};
