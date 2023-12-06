/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { PriceDisplay } from '@/components/blocks/PriceDisplay';
import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { AdminApprovalsManagementTableData } from '@/data/types/Admin_ApprovalsManagement';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const AdminOrderApprovalsManagementTableTotalPriceCell: FC<
	CellContext<AdminApprovalsManagementTableData, unknown>
> = ({ column, row }) => {
	const { order } = row.original;
	return (
		<TableCellResponsiveContent label={column.columnDef.header as string}>
			<Typography>
				<PriceDisplay currency={order?.currency} min={Number(order?.orderTotal)} />
			</Typography>
		</TableCellResponsiveContent>
	);
};
