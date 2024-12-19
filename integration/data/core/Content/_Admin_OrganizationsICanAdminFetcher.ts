/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import type { ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetails } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsOrganization from 'integration/generated/transactions/transactionsOrganization';
import { keyBy } from 'lodash';
import { GetServerSidePropsContext } from 'next';

export const organizationsByIDDataMap = (
	organizationsResponse?: ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetails
) => keyBy(organizationsResponse?.organizationDataBeans ?? [], 'organizationId');

export const organizationsDataMap = (
	organizationsResponse?: ComIbmCommerceUserBeansOrganizationSearchDataBeanIBMOrganizationListDetails
) => organizationsResponse?.organizationDataBeans ?? [];

/**
 * Method to get the organization list and I as buyer administrator can manage.
 * @param pub
 * @param _context
 * @returns The organization list and I as buyer administrator can manage.
 */
export const organizationsICanAdminFetcher =
	(pub: boolean, _context?: GetServerSidePropsContext) =>
	async (storeId: string, params: RequestParams) => {
		try {
			return await transactionsOrganization(pub).organizationFindByQuery(
				storeId,
				{
					profileName: 'IBM_Organization_List_Summary',
					q: 'organizationsICanAdmin',
				},
				params
			);
		} catch (e) {
			if (pub) {
				throw e;
			}
			return undefined;
		}
	};
