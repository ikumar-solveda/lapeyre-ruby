/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { ID } from '@/data/types/Basic';
import { logger } from '@/logging/logger';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsLoginIdentity from 'integration/generated/transactions/transactionsLoginIdentity';

export const logoutFetcher =
	(pub: boolean) =>
	async (
		storeId: string,
		query: {
			[key: string]: string | boolean | ID[] | number;
		},
		params: RequestParams
	) => {
		try {
			return await transactionsLoginIdentity(pub).loginIdentityLogout(storeId, query, params);
		} catch (error) {
			if (pub) {
				throw error;
			} else {
				logger.error('Logout: logoutFetcher: error: %o', error);
				return error;
			}
		}
	};
