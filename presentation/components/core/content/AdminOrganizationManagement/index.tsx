/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { AdminOrganizationManagementHeader } from '@/components/content/AdminOrganizationManagement/parts/Header';
import { AdminOrganizationManagementTable } from '@/components/content/AdminOrganizationManagement/parts/Table';
import { adminOrganizationManagementPaperSX } from '@/components/content/AdminOrganizationManagement/styles/paper';
import { useAdmin_OrganizationManagement } from '@/data/Content/Admin_OrganizationManagement';
import { useLocalization } from '@/data/Localization';
import { initialSearchValues } from '@/data/constants/admin_organizationManagement';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { useForm } from '@/utils/useForm';
import { Paper, Stack, Typography } from '@mui/material';
import { FC, FormEvent, useCallback, useMemo } from 'react';

export const AdminOrganizationManagement: FC<{ id: ID }> = () => {
	const localization = useLocalization('OrganizationManagement');
	const useAdmin_OrganizationManagementValue = useAdmin_OrganizationManagement();
	const searchFormValue = useForm(initialSearchValues);
	const { onSearch } = useAdmin_OrganizationManagementValue;
	const { formRef, resetForm } = searchFormValue;
	const ctxValue = useMemo(
		() => ({ useAdmin_OrganizationManagementValue, searchFormValue }),
		[useAdmin_OrganizationManagementValue, searchFormValue]
	);
	const onClear = useCallback(
		(_event: FormEvent) => {
			resetForm();
			onSearch(initialSearchValues);
		},
		[onSearch, resetForm]
	);

	return (
		<ContentProvider value={ctxValue}>
			<Stack spacing={2}>
				<Typography variant="h3">{localization.OrganizationManagement.t()}</Typography>
				<Paper sx={adminOrganizationManagementPaperSX}>
					<Stack spacing={3} component="form" ref={formRef} onReset={onClear} noValidate>
						<AdminOrganizationManagementHeader />
						<AdminOrganizationManagementTable />
					</Stack>
				</Paper>
			</Stack>
		</ContentProvider>
	);
};
