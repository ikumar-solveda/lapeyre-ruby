/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { organizationManagementFetcher } from '@/data/Content/_Admin_OrganizationManagement';
import {
	organizationsDataMap,
	organizationsICanAdminFetcher,
} from '@/data/Content/_Admin_OrganizationsICanAdminFetcher';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { initialSearchValues } from '@/data/constants/admin_organizationManagement';
import { DATA_KEY_ORGANIZATION_MANAGEMENT } from '@/data/constants/dataKey';
import { PAGINATION } from '@/data/constants/tablePagination';
import {
	OrganizationManagementFetchRequest,
	OrganizationManagementResponse,
} from '@/data/types/Admin_OrganizationManagement';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { PaginationState } from '@tanstack/react-table';
import { debounce, keyBy } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

const dataMap = (organizationData?: OrganizationManagementResponse) =>
	organizationData?.organizationDataBeans ?? [];

export const useAdmin_OrganizationManagement = () => {
	const params = useExtraRequestParameters();
	const { settings } = useSettings();
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});

	const { pageIndex, pageSize } = pagination;
	const router = useNextRouter();
	const extraParams = useExtraRequestParameters();
	const { storeId } = getClientSideCommon(settings, router);
	const [apiPayload, setApiPayload] =
		useState<OrganizationManagementFetchRequest>(initialSearchValues);

	const { data: parentOrganizationsData } = useSWR(
		[storeId, organizationsICanAdminFetcher.name, DATA_KEY_ORGANIZATION_MANAGEMENT],
		async ([storeId]) => organizationsICanAdminFetcher(true)(storeId, params)
	);
	const { parentOrganizations, parentOrganizationsByName } = useMemo(() => {
		const parentOrganizations = organizationsDataMap(parentOrganizationsData);
		const parentOrganizationsByName = keyBy(parentOrganizations, 'organizationName');
		return { parentOrganizations, parentOrganizationsByName };
	}, [parentOrganizationsData]);

	const { data, error, isLoading } = useSWR(
		storeId
			? [
					{
						storeId,
						...apiPayload,
						startIndex: `${pageIndex * pageSize}`,
						maxResults: `${pageSize}`,
					},
					DATA_KEY_ORGANIZATION_MANAGEMENT,
			  ]
			: null,
		async ([{ storeId, ...query }]) =>
			organizationManagementFetcher(true)(storeId, query, extraParams),
		{ revalidateOnMount: true }
	);
	const organizations = useMemo(() => dataMap(data), [data]);
	const { totalRecords, pageCount } = useMemo(() => {
		const totalRecords = data?.recordSetTotal ?? 0;
		const pageCount = Math.ceil(totalRecords / pageSize);
		return { totalRecords, pageCount };
	}, [data, pageSize]);

	const onSearch = useCallback((values: OrganizationManagementFetchRequest) => {
		setPagination((prev) => ({ ...prev, pageIndex: 0 }));
		setApiPayload((prev) => ({ ...prev, ...values }));
	}, []);

	const onDebouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

	return {
		parentOrganizations,
		parentOrganizationsByName,
		organizations,
		isLoading,
		error,
		onSearch,
		onDebouncedSearch,
		totalRecords,
		pageCount,
		pagination,
		setPagination,
	};
};
