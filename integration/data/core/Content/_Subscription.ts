/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { error as logError } from '@/data/utils/loggerUtil';
import type { ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsOrder from 'integration/generated/transactions/transactionsOrder';
import transactionsSubscription from 'integration/generated/transactions/transactionsSubscription';
import { GetServerSidePropsContext } from 'next';
import { RequestQuery } from '../types/RequestQuery';

type RequestQueryForSubscriptions = RequestQuery & {
	q: 'byBuyerIdAndSubscriptionType' | 'bySubscriptionIds';
	subscriptionTypeCode: string;
	subscriptionId: string;
	buyerId: string;
	profileName?: 'IBM_Store_Summary';
	responseFormat?: 'xml' | 'json';
};
type RequestQueryForCancelSubscriptions = RequestQuery & {
	responseFormat?: 'xml' | 'json';
	subscriptionId?: string;
};

type RequestQueryForSubscriptionById = RequestQuery & {
	profileName?: 'IBM_Admin_Summary';
	responseFormat?: 'xml' | 'json';
};
type RequestQueryForSubscriptionHistory = RequestQuery & {
	q: 'findByParentOrderId';
	orderId: string;
	orderItemId?: string;
	pageNumber?: number;
	pageSize?: number;
};
type RequestQueryForSubmitSubscriptions = RequestQuery & {
	responseFormat?: 'xml' | 'json';
};

export const subscriptionFetcher =
	(pub: boolean, throwError = true) =>
	async (storeId: string, query: RequestQueryForSubscriptions, params: RequestParams) => {
		try {
			return await transactionsSubscription(pub).subscriptionByBuyerIdAndSubscriptionType(
				storeId,
				query,
				params
			);
		} catch (e) {
			if (throwError) {
				throw e;
			} else {
				return undefined;
			}
		}
	};

export const subscriptionFetcherById =
	(pub: boolean, throwError = true) =>
	async (
		storeId: string,
		subscriptionId: string,
		query: RequestQueryForSubscriptionById,
		params: RequestParams
	) => {
		try {
			return await transactionsSubscription(pub).subscriptionBySubscriptionId(
				storeId,
				subscriptionId,
				query,
				params
			);
		} catch (e) {
			if (throwError) {
				throw e;
			} else {
				return undefined;
			}
		}
	};

export const subscriptionHistoryFetcherById =
	(pub: boolean, throwError = true) =>
	async (storeId: string, query: RequestQueryForSubscriptionHistory, params: RequestParams) => {
		try {
			return await transactionsOrder(pub).orderOrdersICanWorkonbehalf(
				storeId,
				query as any,
				params
			);
		} catch (e) {
			if (throwError) {
				throw e;
			} else {
				return undefined;
			}
		}
	};

export const subscriptionFetcherCancelOrder =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		orderId: string,
		query: RequestQueryForCancelSubscriptions,
		params: RequestParams
	) => {
		try {
			return await transactionsSubscription(pub).subscriptionCancelRecurringOrSubscription(
				storeId,
				orderId,
				query,
				params
			);
		} catch (error) {
			if (pub) {
				logError(context?.req, '_Subscription: subscriptionFetcherCancelOrder: error: %o', error);
				throw error;
			}
			return undefined;
		}
	};

export const submitRecurringOrSubscription =
	(pub: boolean, throwError = true) =>
	async (
		storeId: string,
		orderId: string,
		query: RequestQueryForSubmitSubscriptions,
		data: ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription,
		params: RequestParams
	) => {
		try {
			return await transactionsSubscription(pub).subscriptionSubmitRecurringOrSubscription(
				storeId,
				orderId,
				query,
				data,
				params
			);
		} catch (e) {
			if (throwError) {
				throw e;
			} else {
				return undefined;
			}
		}
	};
