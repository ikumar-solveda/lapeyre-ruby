/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { EMPTY_STRING } from '@/data/constants/marketing';
import type {
	InProgressOrdersCopyCreatorProps,
	InProgressOrdersCreatorProps,
	InProgressOrdersRemoverProps,
} from '@/data/types/InProgressOrders';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { transactionsCart } from 'integration/generated/transactions';
import { GetServerSidePropsContext } from 'next';

/**
 * Create an inProgressOrder.
 */
export const inProgressOrdersCreator =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		query = { description: EMPTY_STRING },
		params,
	}: InProgressOrdersCreatorProps) => {
		try {
			return await transactionsCart(pub).cartCreateOrder(storeId, query, undefined, params);
		} catch (error) {
			errorWithId(getRequestId(context), '_inProgressOrders: inProgressOrdersCreator: error: %o', {
				error,
			});
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};

/**
 * Create a copy inProgressOrder.
 */
export const inProgressOrdersCopyCreator =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ storeId, data, params }: InProgressOrdersCopyCreatorProps) => {
		try {
			return await transactionsCart(pub).cartCopyOrder(storeId, undefined, data, params);
		} catch (error) {
			errorWithId(
				getRequestId(context),
				'_inProgressOrders: inProgressOrdersCopyCreator: error: %o',
				{ error }
			);
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};

/**
 * Delete an inProgressOrder.
 */
export const inProgressOrdersRemover =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({ storeId, orderId, params }: InProgressOrdersRemoverProps) => {
		try {
			return await transactionsCart(pub).cartCancelOrder(storeId, orderId, undefined, params);
		} catch (error) {
			errorWithId(getRequestId(context), '_inProgressOrders: inProgressOrdersRemover: error: %o', {
				error,
			});
			if (pub) {
				throw error;
			}
			return undefined;
		}
	};
