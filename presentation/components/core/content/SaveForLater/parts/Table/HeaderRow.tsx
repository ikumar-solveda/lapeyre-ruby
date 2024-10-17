/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { TableData } from '@/components/content/SaveForLater';
import { TableSortLabel } from '@mui/material';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

export const SaveForLaterTableHeaderRow: FC<{
	headerGroup: HeaderGroup<TableData>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`save-for-later-table-header-row-${headerGroup.id}`}
		data-testid={`save-for-later-table-header-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`save-for-later-table-header-row-cell-${header.id}`}
				id={`save-for-later-table-header-row-cell-${header.id}`}
				data-testid={`save-for-later-table-header-row-cell-${header.id}`}
			>
				{header.column.getCanSort() ? (
					<TableSortLabel
						active={header.column.getIsSorted() !== false}
						direction={(header.column.getIsSorted() || undefined) as 'desc' | 'asc' | undefined}
						onClick={header.column.getToggleSortingHandler()}
					>
						{flexRender(header.column.columnDef.header, header.getContext())}
					</TableSortLabel>
				) : null}
			</TableCell>
		))}
	</TableRow>
);
