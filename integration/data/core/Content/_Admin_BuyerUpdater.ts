/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import type { ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminUpdateRequest } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsPerson from 'integration/generated/transactions/transactionsPerson';

export const buyerUpdater =
	(pub: boolean) =>
	async (
		storeId: string,
		userId: string,
		data: ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminUpdateRequest,
		params: RequestParams
	) =>
		await transactionsPerson(pub).personUpdatePersonByAdmin(storeId, userId, data, params);
