/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { adminOrderApprovalsManagementStatusCircleSX } from '@/components/content/AdminOrderApprovalsManagement/styles/statusCircle';
import {
	APPROVALS_STATUS_MAP,
	DEFAULT_APPROVALS_STATUS,
} from '@/data/constants/admin_approvalsManagement';
import { useLocalization } from '@/data/Localization';
import { AdminApprovalsManagementTableData } from '@/data/types/Admin_ApprovalsManagement';
import { Circle } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const AdminOrderApprovalsManagementTableStatusCell: FC<
	CellContext<AdminApprovalsManagementTableData, unknown>
> = ({ column, row }) => {
	const approvalsManagementNLS = useLocalization('ApprovalsManagement');
	const { status = DEFAULT_APPROVALS_STATUS } = row.original;
	const statusKey = APPROVALS_STATUS_MAP[status as keyof typeof APPROVALS_STATUS_MAP];
	return (
		<TableCellResponsiveContent label={column.columnDef.header as string}>
			<Stack direction="row" spacing={1} justifyContent="flex-start">
				<Circle fontSize="small" sx={adminOrderApprovalsManagementStatusCircleSX(status)} />
				<Typography>
					{approvalsManagementNLS.Columns[
						statusKey as keyof typeof approvalsManagementNLS.Columns
					].t()}
				</Typography>
			</Stack>
		</TableCellResponsiveContent>
	);
};
