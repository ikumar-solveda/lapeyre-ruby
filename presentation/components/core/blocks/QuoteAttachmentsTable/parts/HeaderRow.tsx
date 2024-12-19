/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { ATTACHMENTS_TABLE } from '@/data/constants/quotes';
import type { FileAttachment } from '@/data/types/Quote';
import { flexRender, type HeaderGroup } from '@tanstack/react-table';
import type { FC } from 'react';

export const QuoteAttachmentsTableHeaderRow: FC<{
	headerGroup: HeaderGroup<FileAttachment>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`${ATTACHMENTS_TABLE}-head-row-${headerGroup.id}`}
		data-testid={`${ATTACHMENTS_TABLE}-head-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${ATTACHMENTS_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
				id={`${ATTACHMENTS_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${ATTACHMENTS_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
			>
				{flexRender(header.column.columnDef.header, header.getContext())}
			</TableCell>
		))}
	</TableRow>
);
