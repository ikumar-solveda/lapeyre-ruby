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
import { FC } from 'react';

export const AdminOrderApprovalsManagementTableSubmittedCell: FC<
	CellContext<AdminApprovalsManagementTableData, unknown>
> = ({ column, row }) => {
	const { submitTime = EMPTY_STRING } = row.original;
	const dateFormatter = useDateTimeFormat();
	return (
		<TableCellResponsiveContent label={column.columnDef.header as string}>
			<Typography>{dateFormatter.format(new Date(submitTime))}</Typography>
		</TableCellResponsiveContent>
	);
};
