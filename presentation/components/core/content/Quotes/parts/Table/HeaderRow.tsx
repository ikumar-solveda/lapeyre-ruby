/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { AVAILABLE_QUOTES_LIST_TABLE } from '@/data/constants/quotes';
import type { QuoteItem } from '@/data/types/Quote';
import { TableSortLabel } from '@mui/material';
import { flexRender, type HeaderGroup } from '@tanstack/react-table';
import type { FC } from 'react';

export const QuotesTableHeaderRow: FC<{
	headerGroup: HeaderGroup<QuoteItem>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`${AVAILABLE_QUOTES_LIST_TABLE}-head-row-${headerGroup.id}`}
		data-testid={`${AVAILABLE_QUOTES_LIST_TABLE}-head-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${AVAILABLE_QUOTES_LIST_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
				id={`${AVAILABLE_QUOTES_LIST_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${AVAILABLE_QUOTES_LIST_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
			>
				{header.column.getCanSort() ? (
					<TableSortLabel
						id={`${AVAILABLE_QUOTES_LIST_TABLE}-sort-${header.id}`}
						data-testid={`${AVAILABLE_QUOTES_LIST_TABLE}-sort-${header.id}`}
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
