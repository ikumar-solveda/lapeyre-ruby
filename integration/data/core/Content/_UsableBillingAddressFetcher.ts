/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { ID } from '@/data/types/Basic';
import { getRequestId } from '@/data/utils/getRequestId';
import { errorWithId } from '@/data/utils/loggerUtil';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsCart from 'integration/generated/transactions/transactionsCart';
import { GetServerSidePropsContext } from 'next';

export const usableBillingAddressFetcher =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async (
		storeId: string,
		orderId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		params: RequestParams
	) => {
		try {
			return await transactionsCart(pub).cartGetUsableBillingAddressListTcDataBean(
				storeId,
				orderId,
				query,
				params
			);
		} catch (error) {
			if (pub) {
				throw error;
			} else {
				errorWithId(
					getRequestId(context),
					'_UsableBillingAddressFetcher: usableBillingAddressFetcher: error: %o',
					{ error }
				);
				return undefined;
			}
		}
	};
