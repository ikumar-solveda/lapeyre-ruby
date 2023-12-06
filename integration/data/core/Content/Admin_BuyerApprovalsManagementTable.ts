/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { approvalsManagementFetch } from '@/data/Content/_Admin_ApprovalsManagement';
import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { useSettings } from '@/data/Settings';
import { useUser } from '@/data/User';
import { DATA_KEY_BUYER_APPROVALS_MANAGEMENT } from '@/data/constants/dataKey';
import { PAGINATION } from '@/data/constants/tablePagination';
import {
	AdminApprovalsManagementQueryParam,
	AdminBuyerOrderSearchData,
} from '@/data/types/Admin_ApprovalsManagement';
import { sanitizeSearchPayload } from '@/data/utils/admin_approvalsUtil';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

const DEFAULT_SORT = 'D-submitTime';
const ORDER_BY = {
	approvalId: (desc: boolean) => (desc ? 'D-approvalStatusId' : 'A-approvalStatusId'),
	approvedOrRejected: (desc: boolean) => (desc ? 'D-approveTime' : 'A-approveTime'),
	submitted: (desc: boolean) => (desc ? 'D-submitTime' : 'A-submitTime'),
	status: (desc: boolean) => (desc ? 'D-status' : 'A-status'),
};

export const useAdmin_BuyerApprovalsManagementTable = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const params = useExtraRequestParameters();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const [searchParam, setSearchParam] = useState({});
	const [sorting, setSorting] = useState<SortingState>([]);
	const orderBy = useMemo(() => {
		const sort = sorting.at(0);
		return (sort
			? ORDER_BY[sort.id as keyof typeof ORDER_BY](sort.desc)
			: DEFAULT_SORT) as unknown as AdminApprovalsManagementQueryParam['orderBy'];
	}, [sorting]);
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const onToggleOptions = useCallback(() => setShowOptions((prev) => !prev), []);

	const onSearch = useCallback((values: AdminBuyerOrderSearchData) => {
		setPagination({ pageIndex: 0, pageSize: PAGINATION.sizes[0] });
		setSearchParam(() => sanitizeSearchPayload(values));
	}, []);
	const onDebouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);

	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const { user } = useUser();
	const approverId = user?.userId as unknown as number;
	const { data, error, isLoading } = useSWR(
		[
			{
				storeId,
				langId,
				orderBy,
				pageNumber: pageIndex + 1,
				pageSize,
				approverId,
				...searchParam,
				params,
			},
			DATA_KEY_BUYER_APPROVALS_MANAGEMENT,
		],
		async ([{ params, ...props }]) => approvalsManagementFetch(true)(props, params),
		{ keepPreviousData: true, revalidateOnMount: true }
	);
	const { totalRecords, pageCount } = useMemo(() => {
		const totalRecords = data?.recordSetTotal ?? 0;
		const pageCount = Math.ceil(totalRecords / pageSize);
		return { totalRecords, pageCount };
	}, [data, pageSize]);

	return {
		data,
		isLoading,
		error,
		pagination,
		setPagination,
		pageCount,
		totalRecords,
		sorting,
		setSorting,
		onSearch,
		onDebouncedSearch,
		showOptions,
		onToggleOptions,
	};
};
