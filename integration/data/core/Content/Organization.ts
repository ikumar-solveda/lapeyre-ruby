/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { useNotifications } from '@/data/Content/Notifications';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_ORGANIZATION_DESCRIPTIONS } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useCompareProductsState } from '@/data/state/useCompareProductsState';
import { TransactionErrorResponse } from '@/data/types/Basic';
import { losslessParser } from '@/data/utils/losslessParser';
import { organizationContractMutatorKeyMatcher } from '@/data/utils/mutatorKeyMatchers/organizationContractMutatorKeyMatcher';
import { processError } from '@/data/utils/processError';
import type { ComIbmCommerceMemberBeansOrganizationListDataBeanIBMOrganizationSummary } from 'integration/generated/transactions/data-contracts';
import { RequestParams } from 'integration/generated/transactions/http-client';
import transactionsOrganization from 'integration/generated/transactions/transactionsOrganization';
import transactionsSwitchOrganization from 'integration/generated/transactions/transactionsSwitchOrganization';
import { keyBy } from 'lodash';
import { MouseEvent, useMemo } from 'react';
import useSWR, { mutate } from 'swr';

const descriptionsFetcher =
	(pub: boolean) =>
	async ({
		storeId,
		query = {},
		params,
	}: {
		storeId: string;
		query?: Record<string, any>;
		params: RequestParams;
	}) =>
		await transactionsOrganization(pub)
			.organizationGetEntitledOrganizations(storeId, query, { ...params, format: 'text' })
			.then(
				(raw: unknown) =>
					losslessParser(
						raw as string
					) as ComIbmCommerceMemberBeansOrganizationListDataBeanIBMOrganizationSummary
			)
			.catch((e) => {
				e.error = losslessParser(e.error as string);
				throw e;
			});

const switcher =
	(pub: boolean) =>
	async ({
		storeId,
		query = {},
		data,
		params,
	}: {
		storeId: string;
		query?: Record<string, string>;
		data: { activeOrgId: string };
		params: RequestParams;
	}) =>
		await transactionsSwitchOrganization(pub).switchOrganizationSwitchToUpdate(
			storeId,
			query,
			data,
			params
		);

const dataMap = (
	rawData: ComIbmCommerceMemberBeansOrganizationListDataBeanIBMOrganizationSummary | undefined,
	error?: any
) => {
	const organizations = !error ? rawData?.entitledOrganizations : undefined;
	const byId = organizations ? keyBy(organizations, 'organizationId') : undefined;
	return { organizations, byId };
};

export const useOrganization = () => {
	const { settings } = useSettings();
	const { notifyError } = useNotifications();
	const storeId = settings?.storeId as string;
	const params = useExtraRequestParameters();
	const { data, error } = useSWR(
		storeId ? [{ storeId }, DATA_KEY_ORGANIZATION_DESCRIPTIONS] : null,
		async ([{ storeId }]) => descriptionsFetcher(true)({ storeId, params }),
		{ keepPreviousData: true }
	);
	const { organizations, byId } = useMemo(() => dataMap(data, error), [data, error]);
	const router = useNextRouter();
	const {
		actions: { removeData },
	} = useCompareProductsState();

	const onOrgSwitch = (activeOrgId: string, compact: boolean) => async (event: MouseEvent) => {
		event.preventDefault();
		const data = { activeOrgId };
		try {
			await switcher(true)({ storeId, params, data });
			await mutate(organizationContractMutatorKeyMatcher(EMPTY_STRING), undefined);
			await removeData();
			// if changed from popup -- go to home-page -- we want to avoid discrepancies, e.g., things
			//   not applicable in org that was just switched-to
			if (compact) {
				router.push('/');
			}
		} catch (e) {
			notifyError(processError(e as TransactionErrorResponse));
		}
	};

	return { organizations, byId, onOrgSwitch };
};
