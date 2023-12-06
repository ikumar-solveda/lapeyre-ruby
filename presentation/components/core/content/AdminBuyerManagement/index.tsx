/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { AdminBuyerManagementHeader } from '@/components/content/AdminBuyerManagement/parts/Header';
import { AdminBuyerManagementHeaderSearchOptions } from '@/components/content/AdminBuyerManagement/parts/Header/SearchOptions';
import { AdminBuyerManagementTable } from '@/components/content/AdminBuyerManagement/parts/Table';
import { adminBuyerManagementPaperSX } from '@/components/content/AdminBuyerManagement/styles/paper';
import { useAdmin_BuyerManagement } from '@/data/Content/Admin_BuyerManagement';
import { useLocalization } from '@/data/Localization';
import { searchInitialValues } from '@/data/constants/admin_buyerManagement';
import { ContentProvider } from '@/data/context/content';
import { ID } from '@/data/types/Basic';
import { useForm } from '@/utils/useForm';
import { Paper, Stack, Typography } from '@mui/material';
import { FC, FormEvent, useCallback, useMemo } from 'react';

export const AdminBuyerManagement: FC<{ id: ID }> = () => {
	const localization = useLocalization('BuyerOrganizationAdminTools');
	const buyerManagementValue = useAdmin_BuyerManagement();

	const { onSearch, showOptions } = buyerManagementValue;
	const searchFormValue = useForm(searchInitialValues);
	const { formRef, handleSubmit, resetForm } = searchFormValue;
	const onClear = useCallback(
		(_event: FormEvent) => {
			resetForm();
			onSearch(searchInitialValues);
		},
		[onSearch, resetForm]
	);

	const ctxValue = useMemo(
		() => ({ buyerManagementValue, searchFormValue }),
		[buyerManagementValue, searchFormValue]
	);

	return (
		<ContentProvider value={ctxValue}>
			<Stack spacing={2}>
				<Typography variant="h3">{localization.BuyerManagement.t()}</Typography>
				<Paper sx={adminBuyerManagementPaperSX}>
					<Stack
						spacing={3}
						component="form"
						ref={formRef}
						onSubmit={handleSubmit(onSearch)}
						onReset={onClear}
						noValidate
					>
						<AdminBuyerManagementHeader />
						{showOptions ? <AdminBuyerManagementHeaderSearchOptions /> : null}
						<AdminBuyerManagementTable />
					</Stack>
				</Paper>
			</Stack>
		</ContentProvider>
	);
};
