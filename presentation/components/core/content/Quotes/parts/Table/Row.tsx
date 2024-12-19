/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { AVAILABLE_QUOTES_LIST_TABLE } from '@/data/constants/quotes';
import type { QuoteItem } from '@/data/types/Quote';
import { flexRender, type Row } from '@tanstack/react-table';
import type { FC } from 'react';

export const QuotesTableRow: FC<{ row: Row<QuoteItem> }> = ({ row }) => (
	<TableRow
		id={`${AVAILABLE_QUOTES_LIST_TABLE}-row-${row.id}`}
		data-testid={`${AVAILABLE_QUOTES_LIST_TABLE}-row-${row.id}`}
		responsive
		selected={row.getIsSelected()}
	>
		{row.getVisibleCells().map((cell) => (
			<TableCell
				key={`${AVAILABLE_QUOTES_LIST_TABLE}-cell-${cell.id}`}
				id={`${AVAILABLE_QUOTES_LIST_TABLE}-cell-${cell.id}`}
				data-testid={`${AVAILABLE_QUOTES_LIST_TABLE}-cell-${cell.id}`}
				responsive
			>
				{flexRender(cell.column.columnDef.cell, cell.getContext())}
			</TableCell>
		))}
	</TableRow>
);
