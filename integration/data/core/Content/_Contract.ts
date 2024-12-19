/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsContract from 'integration/generated/transactions/transactionsContract';
import transactionsSwitchContract from 'integration/generated/transactions/transactionsSwitchContract';

export const contractDescriptionsFetcher =
	(pub: boolean) =>
	async ({
		storeId,
		query = { q: 'eligible' },
		params,
	}: {
		storeId: string;
		query?: { q: 'byPaymentTermConditionId' | 'eligible' };
		params: RequestParams;
	}) =>
		await transactionsContract(pub).contractDetail(storeId, query, params);

export const contractSwitcher =
	(pub: boolean) =>
	async ({
		storeId,
		query = {},
		data,
		params,
	}: {
		storeId: string;
		query?: Record<string, string>;
		data: { contractId: string };
		params: RequestParams;
	}) =>
		await transactionsSwitchContract(pub).switchContractSwitchToUpdate(
			storeId,
			query,
			data,
			params
		);
