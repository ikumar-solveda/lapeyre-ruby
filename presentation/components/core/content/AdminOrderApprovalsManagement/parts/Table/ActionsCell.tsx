/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { adminOrderApprovalsManagementActionsCellIconSX } from '@/components/content/AdminOrderApprovalsManagement/styles/actionsCellIcon';
import {
	DEFAULT_APPROVALS_STATUS,
	ORDER_APPROVALS_MANAGEMENT_TABLE,
} from '@/data/constants/admin_approvalsManagement';
import { useAdmin_OrderApprovalsManagementTableAction } from '@/data/Content/Admin_OrderApprovalsManagementTableAction';
import { useLocalization } from '@/data/Localization';
import { AdminApprovalsManagementTableData } from '@/data/types/Admin_ApprovalsManagement';
import { Cancel, CheckCircle } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useCallback } from 'react';

export const AdminOrderApprovalsManagementTableActionsCell: FC<
	CellContext<AdminApprovalsManagementTableData, unknown>
> = (props) => {
	const { column, row } = props;
	const approvalsManagementNLS = useLocalization('ApprovalsManagement');
	const { onApproval, onReject } = useAdmin_OrderApprovalsManagementTableAction(props);
	const { status = DEFAULT_APPROVALS_STATUS } = row.original;
	const onApprovalAction = useCallback(() => {
		onApproval();
	}, [onApproval]);
	const onRejectAction = useCallback(() => {
		onReject();
	}, [onReject]);

	return (
		<TableCellResponsiveContent label={column.columnDef.header as string}>
			{status === DEFAULT_APPROVALS_STATUS ? (
				<Stack direction="row" spacing={1}>
					<IconButton
						color="primary"
						sx={adminOrderApprovalsManagementActionsCellIconSX}
						id={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-${row.id}-actions-approve-button`}
						data-testid={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-${row.id}-actions-approve-button`}
						onClick={onApprovalAction}
					>
						<Tooltip title={approvalsManagementNLS.Approve.t()}>
							<CheckCircle />
						</Tooltip>
					</IconButton>
					<IconButton
						color="primary"
						sx={adminOrderApprovalsManagementActionsCellIconSX}
						id={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-${row.id}-actions-reject-button`}
						data-testid={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-${row.id}-actions-reject-button`}
						onClick={onRejectAction}
					>
						<Tooltip title={approvalsManagementNLS.Reject.t()}>
							<Cancel />
						</Tooltip>
					</IconButton>
				</Stack>
			) : null}
		</TableCellResponsiveContent>
	);
};
