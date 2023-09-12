/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { fileUploadJobsFetcher } from '@/data/Content/_FileUploadJob';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_VIEW_UPLOAD_LOG } from '@/data/constants/dataKey';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { PAGINATION } from '@/data/constants/tablePagination';
import { generateKeyMatcher } from '@/data/utils/generateKeyMatcher';
import { PaginationState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

export const useRequisitionListsViewUploadLogs = () => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGINATION.sizes[0],
	});
	const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
	const { mutate } = useSWRConfig();

	const { data, error, isLoading } = useSWR(
		[
			{
				storeId: settings.storeId,
				params,
				q: 'byNumberOfDaysAndUploadType',
				numberOfDays: '20',
				uploadType: 'RequisitionListUpload',
				pageNumber: pageIndex + 1,
				pageSize,
			},
			DATA_KEY_VIEW_UPLOAD_LOG,
		],
		async ([props]) => fileUploadJobsFetcher(true)(props),
		{ keepPreviousData: true, revalidateOnMount: true }
	);
	const pageCount = Math.ceil((data?.recordSetTotal ?? 0) / pageSize);

	const mutateRequisitionListsViewLogs = async () =>
		await mutate(generateKeyMatcher({ [DATA_KEY_VIEW_UPLOAD_LOG]: true })(EMPTY_STRING), undefined);

	return {
		data,
		error,
		isLoading,
		mutateRequisitionListsViewLogs,
		pagination,
		setPagination,
		pageCount,
	};
};
