/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { TableData } from '@/components/content/OrderItemTable';
import { TableSortLabel } from '@mui/material';

export const OrderItemTableHeaderRow: FC<{
	headerGroup: HeaderGroup<TableData>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`order-item-table-header-row-${headerGroup.id}`}
		data-testid={`order-item-table-header-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`order-item-table-header-row-cell-${header.id}`}
				id={`order-item-table-header-row-cell-${header.id}`}
				data-testid={`order-item-table-header-row-cell-${header.id}`}
			>
				{
					<TableSortLabel
						active={header.column.getIsSorted() !== false}
						direction={(header.column.getIsSorted() || undefined) as 'desc' | 'asc' | undefined}
						onClick={header.column.getToggleSortingHandler()}
					>
						{flexRender(header.column.columnDef.header, header.getContext())}
					</TableSortLabel>
				}
			</TableCell>
		))}
	</TableRow>
);
