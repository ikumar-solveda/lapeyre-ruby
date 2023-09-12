/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { useNextRouter } from '@/data/Content/_NextRouter';
import { requisitionListsFetcher } from '@/data/Content/_RequisitionList';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_REQUISITION_LIST } from '@/data/constants/dataKey';
import { PAGINATION } from '@/data/constants/tablePagination';
import { getClientSideCommon } from '@/data/utils/getClientSideCommon';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

const DEFAULT_SORT = 'D-lastUpdate';

const ORDER_BY = {
	description: (desc: boolean) => (desc ? 'D-description' : 'A-description'),
	lastUpdate: (desc: boolean) => (desc ? 'D-lastUpdate' : 'A-lastUpdate'),
	creator: (desc: boolean) =>
		desc ? ['D-lastName', 'D-firstName'] : ['A-lastName', 'A-firstName'],
	status: (desc: boolean) => (desc ? 'D-status' : 'A-status'),
};

export const useRequisitionListsTable = () => {
	const { settings } = useSettings();
	const router = useNextRouter();
	const extraParams = useExtraRequestParameters();
	const { storeId, langId } = getClientSideCommon(settings, router);
	const [sorting, setSorting] = useState<SortingState>([]);
	const orderBy = useMemo(() => {
		const sort = sorting.at(0);
		return sort ? ORDER_BY[sort.id as keyof typeof ORDER_BY](sort.desc) : DEFAULT_SORT;
	}, [sorting]);
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});

	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

	const {
		data,
		error,
		isLoading,
		mutate: mutateRequisitionLists,
	} = useSWR(
		[
			{
				storeId,
				langId,
				orderBy,
				pageNumber: pageIndex + 1,
				pageSize,
			},
			extraParams,
			DATA_KEY_REQUISITION_LIST,
		],
		async ([props, params]) => requisitionListsFetcher(true)(props, params),
		{ keepPreviousData: true, revalidateOnMount: true }
	);
	const pageCount = Math.ceil((data?.recordSetTotal ?? 0) / pageSize);

	return {
		data,
		isLoading,
		error,
		mutateRequisitionLists,
		pagination,
		setPagination,
		pageCount,
		sorting,
		setSorting,
	};
};
