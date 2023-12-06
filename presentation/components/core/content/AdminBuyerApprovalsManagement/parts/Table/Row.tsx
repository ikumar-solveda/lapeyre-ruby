/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { BUYER_APPROVALS_MANAGEMENT_TABLE } from '@/data/constants/admin_approvalsManagement';
import { AdminApprovalsManagementTableData } from '@/data/types/Admin_ApprovalsManagement';
import { flexRender, Row } from '@tanstack/react-table';
import { FC } from 'react';

export const AdminBuyerApprovalsManagementTableRow: FC<{
	row: Row<AdminApprovalsManagementTableData>;
}> = ({ row }) => (
	<TableRow
		id={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-row-${row.id}`}
		data-testid={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-row-${row.id}`}
		responsive
	>
		{row.getVisibleCells().map((cell) => (
			<TableCell
				key={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-cell-${cell.id}`}
				id={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-cell-${cell.id}`}
				data-testid={`${BUYER_APPROVALS_MANAGEMENT_TABLE}-cell-${cell.id}`}
				responsive
			>
				{flexRender(cell.column.columnDef.cell, cell.getContext())}
			</TableCell>
		))}
	</TableRow>
);
