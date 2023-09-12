/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { RequisitionListDetailsHeader } from '@/components/content/RequisitionListDetails/parts/Header';
import { RequisitionListDetailsTable } from '@/components/content/RequisitionListDetails/parts/Table';
import { useRequisitionListDetails } from '@/data/Content/RequisitionListDetails';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Stack } from '@mui/material';
import { FC } from 'react';

export const RequisitionListDetails: FC<{ id: ID }> = () => {
	const requisitionListDetailsValue = useRequisitionListDetails();
	return (
		<ContentProvider value={requisitionListDetailsValue}>
			<Stack spacing={1}>
				<RequisitionListDetailsHeader />
				<RequisitionListDetailsTable />
			</Stack>
		</ContentProvider>
	);
};
