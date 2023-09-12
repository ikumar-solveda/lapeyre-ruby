/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { requisitionListsTableHeadCellSX } from '@/components/content/RequisitionListsTable/styles/headCell';
import { requisitionListsTableHeadRowSX } from '@/components/content/RequisitionListsTable/styles/headRow';
import { REQUISITION_LISTS_TABLE } from '@/data/constants/requisitionLists';
import { RequisitionListsItem } from '@/data/types/RequisitionLists';
import { TableSortLabel } from '@mui/material';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

export const RequisitionListsTableHeaderRow: FC<{
	headerGroup: HeaderGroup<RequisitionListsItem>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`${REQUISITION_LISTS_TABLE}-head-row-${headerGroup.id}`}
		sx={requisitionListsTableHeadRowSX}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${REQUISITION_LISTS_TABLE}-head-cell-${header.id}`}
				id={`${REQUISITION_LISTS_TABLE}-head-cell-${header.id}`}
				data-testid={`${REQUISITION_LISTS_TABLE}-head-cell-${header.id}`}
				sx={requisitionListsTableHeadCellSX}
			>
				{header.column.getCanSort() ? (
					<TableSortLabel
						id={`${REQUISITION_LISTS_TABLE}-sort-${header.id}`}
						data-testid={`${REQUISITION_LISTS_TABLE}-sort-${header.id}`}
						active={header.column.getIsSorted() !== false}
						direction={(header.column.getIsSorted() || undefined) as 'desc' | 'asc' | undefined}
						onClick={header.column.getToggleSortingHandler()}
					>
						{flexRender(header.column.columnDef.header, header.getContext())}
					</TableSortLabel>
				) : (
					flexRender(header.column.columnDef.header, header.getContext())
				)}
			</TableCell>
		))}
	</TableRow>
);
