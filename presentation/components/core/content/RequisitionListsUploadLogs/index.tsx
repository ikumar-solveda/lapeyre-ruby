/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { RequisitionListsUploadLogsHeader } from '@/components/content/RequisitionListsUploadLogs/parts/Header';
import { RequisitionListsUploadLogsTable } from '@/components/content/RequisitionListsUploadLogs/parts/Table';
import { ID } from '@/data/types/Basic';
import { Stack } from '@mui/material';
import { FC } from 'react';

export const RequisitionListsUploadLogs: FC<{ id: ID }> = () => (
	<Stack spacing={2}>
		<RequisitionListsUploadLogsHeader />
		<RequisitionListsUploadLogsTable />
	</Stack>
);
