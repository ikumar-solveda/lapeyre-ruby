/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { adminOrderApprovalsManagementeBuyerCellTypographySX } from '@/components/content/AdminOrderApprovalsManagement/styles/buyerCellTypography';
import { AdminApprovalsManagementTableData } from '@/data/types/Admin_ApprovalsManagement';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const AdminOrderApprovalsManagementTableBuyerCell: FC<
	CellContext<AdminApprovalsManagementTableData, unknown>
> = ({ column, row }) => {
	const { submitter } = row.original;
	const fullName = [submitter?.firstName, submitter?.lastName].filter(Boolean).join(' ');
	return (
		<TableCellResponsiveContent
			label={column.columnDef.header as string}
			sx={adminOrderApprovalsManagementeBuyerCellTypographySX}
		>
			<Typography>{fullName}</Typography>
		</TableCellResponsiveContent>
	);
};
