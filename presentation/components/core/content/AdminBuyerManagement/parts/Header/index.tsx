import { AdminBuyerManagementHeaderActions } from '@/components/content/AdminBuyerManagement/parts/Header/Actions';
import { AdminBuyerManagementHeaderQuickSearch } from '@/components/content/AdminBuyerManagement/parts/Header/QuickSearch';
import { adminBuyerManagementHeaderStack } from '@/components/content/AdminBuyerManagement/styles/Header/stack';
import { Stack } from '@mui/material';
import { FC } from 'react';

/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
export const AdminBuyerManagementHeader: FC = () => (
	<Stack {...adminBuyerManagementHeaderStack}>
		<AdminBuyerManagementHeaderQuickSearch />
		<AdminBuyerManagementHeaderActions />
	</Stack>
);
