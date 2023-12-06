/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { AdminOrganizationManagementHeaderActions } from '@/components/content/AdminOrganizationManagement/parts/Header/Actions';
import { AdminOrganizationManagementHeaderClear } from '@/components/content/AdminOrganizationManagement/parts/Header/Clear';
import { AdminOrganizationManagementNameSearch } from '@/components/content/AdminOrganizationManagement/parts/Header/NameSearch';
import { AdminOrganizationManagementParentOrganizationFilter } from '@/components/content/AdminOrganizationManagement/parts/Header/ParentOrganizationFilter';
import { adminOrganizationManagementHeaderStack } from '@/components/content/AdminOrganizationManagement/styles/Header/stack';
import { Stack } from '@mui/material';
import { FC } from 'react';

export const AdminOrganizationManagementHeader: FC = () => (
	<Stack {...adminOrganizationManagementHeaderStack}>
		<AdminOrganizationManagementNameSearch />
		<AdminOrganizationManagementParentOrganizationFilter />
		<AdminOrganizationManagementHeaderClear />
		<AdminOrganizationManagementHeaderActions />
	</Stack>
);
