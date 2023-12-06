/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { OrganizationManagementStepper } from '@/components/content/AdminOrganizationManagement/parts/Stepper';
import { adminOrganizationManagementPaperSX } from '@/components/content/AdminOrganizationManagement/styles/paper';
import { useAdmin_OrganizationManagementCreate } from '@/data/Content/Admin_OrganizationManagementCreate';
import { useLocalization } from '@/data/Localization';
import {
	ORGANIZATION_MANAGEMENT_CREATE_STEPS,
	initialOrganizationRegistration,
} from '@/data/constants/admin_organizationManagement';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { Paper, Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';

export const AdminOrganizationManagementCreate: FC<{ id: ID }> = () => {
	const localization = useLocalization('OrganizationManagement');
	const actionTitle = localization.NewOrganization.t();
	const useAdmin_OrganizationManagementCreateOrDetailsValue =
		useAdmin_OrganizationManagementCreate();

	const contextValue = useMemo(
		() => ({
			useAdmin_OrganizationManagementCreateOrDetailsValue,
			initialFieldValues: initialOrganizationRegistration,
			steps: ORGANIZATION_MANAGEMENT_CREATE_STEPS,
			actionTitle,
		}),
		[actionTitle, useAdmin_OrganizationManagementCreateOrDetailsValue]
	);

	return (
		<ContentProvider value={contextValue}>
			<Stack spacing={2}>
				<Typography variant="h3">{localization.OrganizationManagement.t()}</Typography>
				<Paper sx={adminOrganizationManagementPaperSX}>
					<OrganizationManagementStepper />
				</Paper>
			</Stack>
		</ContentProvider>
	);
};
