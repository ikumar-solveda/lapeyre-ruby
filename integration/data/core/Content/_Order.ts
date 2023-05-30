/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { RequestQuery } from '@/data/types/RequestQuery';
import { transactionsOrder } from 'integration/generated/transactions';
import { RequestParams } from 'integration/generated/transactions/http-client';

export const STATUSES = 'N,M,A,B,C,R,S,D,F,G,L,W,APP,RTN';

type RequestQueryForOrders = RequestQuery & {
	orderType?: 'private' | 'shared' | 'all';
	pageNumber?: number;
	pageSize?: number;
	currency?: string;
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
