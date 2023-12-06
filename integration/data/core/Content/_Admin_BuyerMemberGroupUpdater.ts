/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { transactionsPerson } from 'integration/generated/transactions';
import { ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUser } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';

export const buyerMemberGroupUpdater =
	(pub = true) =>
	async ({
		storeId,
		userId,
		data,
		params,
	}: {
		storeId: string;
		userId: string;
		data: ComIbmCommerceRestMemberHandlerPersonHandlerUpdateMemberUser;
		params: RequestParams;
	}) =>
		await transactionsPerson(pub).personUpdateMemberUser(storeId, userId, data, params);
