/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { ORGANIZATION_MANAGEMENT_TABLE } from '@/data/constants/admin_organizationManagement';
import { OrganizationManagementTableData } from '@/data/types/Admin_OrganizationManagement';
import { flexRender, Row } from '@tanstack/react-table';
import { FC } from 'react';

export const AdminOrganizationManagementTableRow: FC<{
	row: Row<OrganizationManagementTableData>;
}> = ({ row }) => (
	<TableRow
		id={`${ORGANIZATION_MANAGEMENT_TABLE}-row-${row.id}`}
		data-testid={`${ORGANIZATION_MANAGEMENT_TABLE}-row-${row.id}`}
		responsive
	>
		{row.getVisibleCells().map((cell) => (
			<TableCell
				key={`${ORGANIZATION_MANAGEMENT_TABLE}-cell-${cell.id}`}
				id={`${ORGANIZATION_MANAGEMENT_TABLE}-cell-${cell.id}`}
				data-testid={`${ORGANIZATION_MANAGEMENT_TABLE}-cell-${cell.id}`}
				responsive
			>
				{flexRender(cell.column.columnDef.cell, cell.getContext())}
			</TableCell>
		))}
	</TableRow>
);
