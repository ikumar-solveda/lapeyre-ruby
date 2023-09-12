/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { useExtraRequestParameters } from '@/data/Content/_ExtraRequestParameters';
import { fileUploadJobFetcher } from '@/data/Content/_FileUploadJob';
import { useSettings } from '@/data/Settings';
import { DATA_KEY_VIEW_UPLOAD_LOG } from '@/data/constants/dataKey';
import useSWR from 'swr';

export const useRequisitionListsViewUploadDetails = (id: string) => {
	const { settings } = useSettings();
	const params = useExtraRequestParameters();
	const { data, error, isLoading } = useSWR(
		[
			{
				storeId: settings.storeId,
				fileUploadJobId: id,
				params,
				pageNumber: 0,
				pageSize: 0,
			},
			DATA_KEY_VIEW_UPLOAD_LOG,
		],
		async ([props]) => fileUploadJobFetcher(true)(props),
		{ keepPreviousData: true }
	);

	return {
		data,
		error,
		isLoading,
	};
};
