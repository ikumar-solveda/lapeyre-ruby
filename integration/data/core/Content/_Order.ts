/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { dDiv, dFix } from '@/data/Settings-Server';
import { Order } from '@/data/types/Order';
import { RequestQuery } from '@/data/types/RequestQuery';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId, error as logError } from '@/data/utils/loggerUtil';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsOrder from 'integration/generated/transactions/transactionsOrder';
import { GetServerSidePropsContext } from 'next';

export const STATUSES = 'N,M,A,B,C,R,S,D,F,G,L,W,APP,RTN';
export const STATUS_PENDING = 'P';

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
	langId?: string;
};

type FullFetcherProps = {
	orderId: string;
	storeId: string;
	query?: RequestQueryForOrders;
	params: RequestParams;
};
export const orderByIdFetcherFull =
	(pub: boolean, context?: GetServerSidePropsContext) => async (props: FullFetcherProps) => {
		const { orderId, storeId, query, params } = props;
		let totalPages = 1;
		let order;

		try {
			order = await (transactionsOrder(pub).orderFindByOrderId(
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
		} catch (error) {
			errorWithId(
				getRequestId(context),
				'_Order: orderByIdFetcherFull: unable to fetch order details',
				{ error }
			);
			throw error;
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
	(pub: boolean, context?: GetServerSidePropsContext) =>
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
				logError(context?.req, 'Error in getting order details find by status service call %o', e);
				throw e;
			}
			// currently, we do not want to break the server with error
			return undefined;
		}
	};
