/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE } from '@/data/constants/inProgressOrders';
import type { InProgressOrderSummaryItem } from '@/data/types/InProgressOrders';
import { flexRender, type Row } from '@tanstack/react-table';
import type { FC } from 'react';

export const InProgressOrdersTableRow: FC<{ row: Row<InProgressOrderSummaryItem> }> = ({ row }) => (
	<TableRow
		id={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-row-${row.id}`}
		data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-row-${row.id}`}
		responsive
		selected={row.getIsSelected()}
	>
		{row.getVisibleCells().map((cell) => (
			<TableCell
				key={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-cell-${cell.id}`}
				id={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-cell-${cell.id}`}
				data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-cell-${cell.id}`}
				responsive
			>
				{flexRender(cell.column.columnDef.cell, cell.getContext())}
			</TableCell>
		))}
	</TableRow>
);
