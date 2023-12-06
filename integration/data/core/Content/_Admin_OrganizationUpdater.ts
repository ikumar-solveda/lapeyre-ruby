/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { error as logError } from '@/data/utils/loggerUtil';
import { transactionsOrganization } from 'integration/generated/transactions';
import {
	ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityIdentity,
	ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityUpdateRequest,
} from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import { GetServerSidePropsContext } from 'next';

export const organizationUpdater =
	(pub: boolean, context?: GetServerSidePropsContext) =>
	async ({
		storeId,
		organizationId,
		data,
		params,
	}: {
		storeId: string;
		organizationId: string;
		data: ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityUpdateRequest;
		params: RequestParams;
	}): Promise<ComIbmCommerceRestMemberHandlerOrganizationHandlerOrgEntityIdentity | undefined> => {
		try {
			return await transactionsOrganization(pub).organizationUpdateOrganization(
				storeId,
				organizationId,
				data,
				params
			);
		} catch (error) {
			logError(context?.req, '_Admin_OrganizationUpdater: organizationUpdater: error: %o', error);
			throw error;
		}
	};
