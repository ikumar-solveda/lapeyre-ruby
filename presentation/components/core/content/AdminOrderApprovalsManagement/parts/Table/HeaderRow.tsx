/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { ORDER_APPROVALS_MANAGEMENT_TABLE } from '@/data/constants/admin_approvalsManagement';
import { AdminApprovalsManagementTableData } from '@/data/types/Admin_ApprovalsManagement';
import { TableSortLabel } from '@mui/material';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { FC } from 'react';

export const AdminOrderApprovalsManagementTableHeaderRow: FC<{
	headerGroup: HeaderGroup<AdminApprovalsManagementTableData>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-row-${headerGroup.id}`}
		data-testid={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-header-row-${headerGroup.id}-cell-${header.id}`}
				id={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-header-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${ORDER_APPROVALS_MANAGEMENT_TABLE}-header-row-${headerGroup.id}-cell-${header.id}`}
			>
				{
					<TableSortLabel
						active={header.column.getIsSorted() !== false}
						hideSortIcon={header.column.getIsSorted() === false}
						direction={(header.column.getIsSorted() || undefined) as 'desc' | 'asc' | undefined}
						onClick={header.column.getToggleSortingHandler()}
					>
						{flexRender(header.column.columnDef.header, header.getContext())}
					</TableSortLabel>
				}
			</TableCell>
		))}
	</TableRow>
);
