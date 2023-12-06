/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AdminBuyerApprovalsManagementSearchDetails } from '@/components/content/AdminBuyerApprovalsManagement/parts/Search/Details';
import { AdminBuyerApprovalsManagementSearchHeader } from '@/components/content/AdminBuyerApprovalsManagement/parts/Search/Header';
import { AdminBuyerApprovalsManagementTable } from '@/components/content/AdminBuyerApprovalsManagement/parts/Table';
import { useAdmin_BuyerApprovalsManagementTable } from '@/data/Content/Admin_BuyerApprovalsManagementTable';
import { initialValues } from '@/data/constants/admin_approvalsManagement';
import { ContentProvider } from '@/data/context/content';
import { useForm } from '@/utils/useForm';
import { Stack } from '@mui/material';
import { FC, FormEvent, useCallback, useMemo } from 'react';

export const AdminBuyerApprovalsManagement: FC = () => {
	const approvalsValue = useAdmin_BuyerApprovalsManagementTable();
	const formValue = useForm(initialValues);
	const ctxValue = useMemo(() => ({ ...approvalsValue, formValue }), [approvalsValue, formValue]);
	const { onSearch, showOptions } = approvalsValue;
	const { formRef, handleSubmit, resetForm } = formValue;
	const onReset = useCallback(
		(_event: FormEvent) => {
			resetForm();
			onSearch(initialValues);
		},
		[onSearch, resetForm]
	);

	return (
		<Stack
			spacing={3}
			component="form"
			ref={formRef}
			onSubmit={handleSubmit(onSearch)}
			onReset={onReset}
			noValidate
		>
			<ContentProvider value={ctxValue}>
				<AdminBuyerApprovalsManagementSearchHeader />
				{showOptions ? <AdminBuyerApprovalsManagementSearchDetails /> : null}
				<AdminBuyerApprovalsManagementTable />
			</ContentProvider>
		</Stack>
	);
};
