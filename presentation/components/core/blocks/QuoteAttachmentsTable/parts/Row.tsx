/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { quoteAttachmentsTableCellSX } from '@/components/blocks/QuoteAttachmentsTable/styles/column';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { ATTACHMENTS_TABLE } from '@/data/constants/quotes';
import type { FileAttachment } from '@/data/types/Quote';
import { flexRender, type Row } from '@tanstack/react-table';
import type { FC } from 'react';

export const QuoteAttachmentsTableRow: FC<{ row: Row<FileAttachment> }> = ({ row }) => (
	<TableRow
		id={`${ATTACHMENTS_TABLE}-row-${row.id}`}
		data-testid={`${ATTACHMENTS_TABLE}-row-${row.id}`}
		responsive
		selected={row.getIsSelected()}
	>
		{row.getVisibleCells().map((cell) => (
			<TableCell
				key={`${ATTACHMENTS_TABLE}-cell-${cell.id}`}
				id={`${ATTACHMENTS_TABLE}-cell-${cell.id}`}
				data-testid={`${ATTACHMENTS_TABLE}-cell-${cell.id}`}
				sx={quoteAttachmentsTableCellSX(cell.column.columnDef.meta as any)}
				responsive
			>
				{flexRender(cell.column.columnDef.cell, cell.getContext())}
			</TableCell>
		))}
	</TableRow>
);
