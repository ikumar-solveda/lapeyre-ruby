/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { transactionsPerson } from 'integration/generated/transactions';
import { ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminUpdateRequest } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';

export const buyerUpdater =
	(pub: boolean) =>
	async (
		storeId: string,
		userId: string,
		data: ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminUpdateRequest,
		params: RequestParams
	) =>
		await transactionsPerson(pub).personUpdatePersonByAdmin(storeId, userId, data, params);
