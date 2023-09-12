/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { requisitionListDetailsTableHeaderCellSX } from '@/components/content/RequisitionListDetails/styles/Table/headerCell';
import { requisitionListDetailsTableHeaderRowSX } from '@/components/content/RequisitionListDetails/styles/Table/headerRow';
import { REQUISITION_LIST_DETAILS_TABLE } from '@/data/constants/requisitionLists';
import { OrderItem } from '@/data/types/Order';
import { TableSortLabel } from '@mui/material';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

export const RequisitionListDetailsTableHeaderRow: FC<{
	headerGroup: HeaderGroup<OrderItem>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`${REQUISITION_LIST_DETAILS_TABLE}-head-row-${headerGroup.id}`}
		sx={requisitionListDetailsTableHeaderRowSX}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				key={`${REQUISITION_LIST_DETAILS_TABLE}-head-cell-${header.id}`}
				id={`${REQUISITION_LIST_DETAILS_TABLE}-head-cell-${header.id}`}
				data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-head-cell-${header.id}`}
				sx={requisitionListDetailsTableHeaderCellSX}
			>
				{header.column.getCanSort() ? (
					<TableSortLabel
						id={`${REQUISITION_LIST_DETAILS_TABLE}-sort-${header.id}`}
						data-testid={`${REQUISITION_LIST_DETAILS_TABLE}-sort-${header.id}`}
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
