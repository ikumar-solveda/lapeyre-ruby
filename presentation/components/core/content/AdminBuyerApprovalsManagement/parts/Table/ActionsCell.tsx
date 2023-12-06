/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { adminBuyerApprovalManagementActionsCellIconSX } from '@/components/content/AdminBuyerApprovalsManagement/styles/actionsCellIcon';
import {
	BUYER_APPROVALS_MANAGEMENT_TABLE,
	DEFAULT_APPROVALS_STATUS,
} from '@/data/constants/admin_approvalsManagement';
import { useAdmin_BuyerApprovalsManagementTableAction } from '@/data/Content/Admin_BuyerApprovalsManagementTableAction';
import { useLocalization } from '@/data/Localization';
import { AdminApprovalsManagementTableData } from '@/data/types/Admin_ApprovalsManagement';
import { Cancel, CheckCircle } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useCallback } from 'react';

export const AdminBuyerApprovalsManagementTableActionsCell: FC<
	CellContext<AdminApprovalsManagementTableData, unknown>
> = (props) => {
	const { column, row } = props;
	const approvalsManagementNLS = useLocalization('ApprovalsManagement');
	const { onApproval, onReject } = useAdmin_BuyerApprovalsManagementTableAction(props);
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
						sx={adminBuyerApprovalManagementActionsCellIconSX}
						id={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-${row.id}-actions-approve-button`}
						data-testid={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-${row.id}-actions-approve-button`}
						onClick={onApprovalAction}
					>
						<Tooltip title={approvalsManagementNLS.Approve.t()}>
							<CheckCircle />
						</Tooltip>
					</IconButton>
					<IconButton
						color="primary"
						sx={adminBuyerApprovalManagementActionsCellIconSX}
						id={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-${row.id}-actions-reject-button`}
						data-testid={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-${row.id}-actions-reject-button`}
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
