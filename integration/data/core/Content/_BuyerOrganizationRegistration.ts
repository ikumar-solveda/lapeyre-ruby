/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import type {
	ComIbmCommerceRestMemberHandlerOrganizationHandlerBuyerRegistrationAddRequest,
	ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityBuyerIdentifier,
} from 'integration/generated/transactions/data-contracts';
import transactionsOrganization from 'integration/generated/transactions/transactionsOrganization';

export const buyerOrganizationRegistrar =
	(pub: boolean) =>
	async (
		storeId: string,
		data: ComIbmCommerceRestMemberHandlerOrganizationHandlerBuyerRegistrationAddRequest,
		query = {},
		params = {}
	): Promise<
		ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityBuyerIdentifier & {
			registrationApprovalStatus?: string;
		}
	> =>
		await transactionsOrganization(pub).organizationRegisterBuyerOrganization(
			storeId,
			data,
			query,
			params
		);
