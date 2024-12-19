/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { losslessParser } from '@/data/utils/losslessParser';
import type { ComIbmCommerceRestMemberHandlerUserContextHandlerUserContext } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsUserContext from 'integration/generated/transactions/transactionsUserContext';

export const contextFetcher =
	(pub: boolean) =>
	async ({
		storeId,
		langId,
		params = {},
	}: {
		storeId: string;
		params?: RequestParams;
		langId?: string;
	}) =>
		await transactionsUserContext(pub)
			.userContextGetContextData(storeId, { langId } as any, { ...params, format: 'text' })
			.then(
				(raw: unknown) =>
					losslessParser(
						raw as string
					) as ComIbmCommerceRestMemberHandlerUserContextHandlerUserContext
			)
			.catch((e) => {
				e.error = losslessParser(e.error as string);
				throw e;
			});
