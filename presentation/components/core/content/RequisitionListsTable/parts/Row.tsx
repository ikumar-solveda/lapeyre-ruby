/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { requisitionListsTableBodyCellSX } from '@/components/content/RequisitionListsTable/styles/bodyCell';
import { requisitionListsTableRowSX } from '@/components/content/RequisitionListsTable/styles/row';
import { REQUISITION_LISTS_TABLE } from '@/data/constants/requisitionLists';
import { RequisitionListsItem } from '@/data/types/RequisitionLists';
import { Row, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

export const RequisitionListsTableRow: FC<{
	row: Row<RequisitionListsItem>;
}> = ({ row }) => (
	<TableRow
		id={`${REQUISITION_LISTS_TABLE}-row-${row.id}`}
		data-testid={`${REQUISITION_LISTS_TABLE}-row-${row.id}`}
		sx={requisitionListsTableRowSX}
		responsive
	>
		{row.getVisibleCells().map((cell) => (
			<TableCell
				key={`${REQUISITION_LISTS_TABLE}-cell-${cell.id}`}
				id={`${REQUISITION_LISTS_TABLE}-cell-${cell.id}`}
				data-testid={`${REQUISITION_LISTS_TABLE}-cell-${cell.id}`}
				sx={requisitionListsTableBodyCellSX}
				responsive
			>
				{flexRender(cell.column.columnDef.cell, cell.getContext())}
			</TableCell>
		))}
	</TableRow>
);
