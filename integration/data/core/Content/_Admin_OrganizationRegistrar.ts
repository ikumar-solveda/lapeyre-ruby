/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { error as logError } from '@/data/utils/loggerUtil';
import type {
	ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityAddRequest,
	ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityIdentity,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsOrganization from 'integration/generated/transactions/transactionsOrganization';
import { GetServerSidePropsContext } from 'next';

export const organizationRegistrar =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		requestData,
		params,
	}: {
		storeId: string;
		requestData: ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityAddRequest;
		params: RequestParams;
	}): Promise<ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityIdentity | undefined> => {
		try {
			return await transactionsOrganization(pub).organizationRegisterOrganization(
				storeId,
				requestData,
				params
			);
		} catch (error) {
			logError(
				context?.req,
				'_Admin_OrganizationRegistrar: organizationRegistrar: error: %o',
				error
			);
			throw error;
		}
	};
