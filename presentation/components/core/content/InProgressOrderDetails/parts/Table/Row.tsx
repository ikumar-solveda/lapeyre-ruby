/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { InProgressOrderDetailsTableDetailPanel } from '@/components/content/InProgressOrderDetails/parts/Table/DetailPanel';
import { AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE } from '@/data/constants/inProgressOrders';
import type { OrderItem } from '@/data/types/Order';
import { flexRender, type Row } from '@tanstack/react-table';
import type { FC } from 'react';

export const InProgressOrderDetailsTableRow: FC<{ row: Row<OrderItem> }> = ({ row }) => (
	<>
		<TableRow
			id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-row-${row.id}`}
			data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-row-${row.id}`}
			responsive
			selected={row.getIsSelected()}
			expanded={row.getIsExpanded()}
		>
			{row.getVisibleCells().map((cell) => (
				<TableCell
					key={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-cell-${cell.id}`}
					id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-cell-${cell.id}`}
					data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-cell-${cell.id}`}
					responsive
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
		{row.getIsExpanded() ? (
			<TableRow
				responsive
				id={`${AVAILABLE_IN_PROGRESS_ORDERS_DETAILS_TABLE}-row-${row.id}-expanded`}
				expandedContent
			>
				<TableCell colSpan={row.getVisibleCells().length} responsive>
					<InProgressOrderDetailsTableDetailPanel row={row} />
				</TableCell>
			</TableRow>
		) : null}
	</>
);
