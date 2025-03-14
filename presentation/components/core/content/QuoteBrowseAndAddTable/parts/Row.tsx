/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { QuoteBrowseAndAddTableDetailPanel } from '@/components/content/QuoteBrowseAndAddTable/parts/DetailPanel';
import { ADD_PRODS_TABLE } from '@/data/constants/quotes';
import type { ProductType } from '@/data/types/Product';
import { flexRender, type Row } from '@tanstack/react-table';
import type { FC } from 'react';

export const QuoteBrowseAndAddTableRow: FC<{ row: Row<ProductType> }> = ({ row }) => (
	<>
		<TableRow
			id={`${ADD_PRODS_TABLE}-row-${row.id}`}
			data-testid={`${ADD_PRODS_TABLE}-row-${row.id}`}
			responsive
			selected={row.getIsSelected()}
			expanded={row.getIsExpanded()}
		>
			{row.getVisibleCells().map((cell) => (
				<TableCell
					key={`${ADD_PRODS_TABLE}-cell-${cell.id}`}
					id={`${ADD_PRODS_TABLE}-cell-${cell.id}`}
					data-testid={`${ADD_PRODS_TABLE}-cell-${cell.id}`}
					responsive
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>

		{row.getIsExpanded() ? (
			<TableRow responsive expandedContent>
				<TableCell colSpan={row.getVisibleCells().length} responsive>
					<QuoteBrowseAndAddTableDetailPanel row={row} />
				</TableCell>
			</TableRow>
		) : null}
	</>
);
