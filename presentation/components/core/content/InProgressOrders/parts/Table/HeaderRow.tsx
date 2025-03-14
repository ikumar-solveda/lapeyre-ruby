/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE } from '@/data/constants/inProgressOrders';
import type { InProgressOrderSummaryItem } from '@/data/types/InProgressOrders';
import { flexRender, type HeaderGroup } from '@tanstack/react-table';
import type { FC } from 'react';

export const InProgressOrdersTableHeaderRow: FC<{
	headerGroup: HeaderGroup<InProgressOrderSummaryItem>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-head-row-${headerGroup.id}`}
		data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-head-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
				id={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${AVAILABLE_IN_PROGRESS_ORDERS_LIST_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
			>
				{flexRender(header.column.columnDef.header, header.getContext())}
			</TableCell>
		))}
	</TableRow>
);
