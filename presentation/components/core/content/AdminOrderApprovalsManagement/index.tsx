/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { AdminOrderApprovalsManagementSearchDetails } from '@/components/content/AdminOrderApprovalsManagement/parts/Search/Details';
import { AdminOrderApprovalsManagementSearchHeader } from '@/components/content/AdminOrderApprovalsManagement/parts/Search/Header';
import { AdminOrderApprovalsManagementTable } from '@/components/content/AdminOrderApprovalsManagement/parts/Table';
import { useAdmin_OrderApprovalsManagementTable } from '@/data/Content/Admin_OrderApprovalsManagementTable';
import { initialValues } from '@/data/constants/admin_approvalsManagement';
import { ContentProvider } from '@/data/context/content';
import { useForm } from '@/utils/useForm';
import { Stack } from '@mui/material';
import { FC, FormEvent, useCallback, useMemo } from 'react';

export const AdminOrderApprovalsManagement: FC = () => {
	const approvalsValue = useAdmin_OrderApprovalsManagementTable();
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
				<AdminOrderApprovalsManagementSearchHeader />
				{showOptions ? <AdminOrderApprovalsManagementSearchDetails /> : null}
				<AdminOrderApprovalsManagementTable />
			</ContentProvider>
		</Stack>
	);
};
