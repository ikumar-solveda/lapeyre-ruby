/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import type { ProductItem } from '@/data/types/Quote';
import { flexRender, type Row } from '@tanstack/react-table';
import { type FC } from 'react';
import { QuoteProductsTableDetailPanel } from '@/components/blocks/QuoteProductsTable/parts/DetailPanel';
import { PRODUCTS_TABLE } from '@/data/constants/quotes';

export const QuoteProductsTableRow: FC<{ row: Row<ProductItem> }> = ({ row }) => (
	<>
		<TableRow
			id={`${PRODUCTS_TABLE}-row-${row.id}`}
			data-testid={`${PRODUCTS_TABLE}-row-${row.id}`}
			responsive
			selected={row.getIsSelected()}
			expanded={row.getIsExpanded()}
		>
			{row.getVisibleCells().map((cell) => (
				<TableCell
					key={`${PRODUCTS_TABLE}-cell-${cell.id}`}
					id={`${PRODUCTS_TABLE}-cell-${cell.id}`}
					data-testid={`${PRODUCTS_TABLE}-cell-${cell.id}`}
					responsive
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>

		{row.getIsExpanded() ? (
			<TableRow responsive expandedContent>
				<TableCell colSpan={row.getVisibleCells().length} responsive>
					<QuoteProductsTableDetailPanel row={row} />
				</TableCell>
			</TableRow>
		) : null}
	</>
);
