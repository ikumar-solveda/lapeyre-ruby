/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { EMPTY_STRING } from '@/data/constants/marketing';
import { useDateTimeFormat } from '@/data/Content/_DateTimeFormatter';
import { AdminApprovalsManagementTableData } from '@/data/types/Admin_ApprovalsManagement';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC, useMemo } from 'react';

export const AdminBuyerApprovalsManagementTableApprovedOrRejectedCell: FC<
	CellContext<AdminApprovalsManagementTableData, unknown>
> = ({ column, row }) => {
	const { approveTime = EMPTY_STRING } = row.original;
	const dateFormatter = useDateTimeFormat();
	const approveRejectTime = useMemo(
		() => (approveTime ? dateFormatter.format(new Date(approveTime)) : EMPTY_STRING),
		[approveTime, dateFormatter]
	);
	return (
		<TableCellResponsiveContent label={column.columnDef.header as string}>
			<Typography>{approveRejectTime}</Typography>
		</TableCellResponsiveContent>
	);
};
