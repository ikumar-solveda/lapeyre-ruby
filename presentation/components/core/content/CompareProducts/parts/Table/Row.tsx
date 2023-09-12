/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { DataElement } from '@/components/content/CompareProducts/parts/Table';
import { TableCell, TableRow } from '@mui/material';
import { Row, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

export const CompareProductsTableRow: FC<{ row: Row<DataElement>; key: string }> = ({ row }) => (
	<TableRow key={`compare-products-table-row-${row.id}`}>
		{row.getVisibleCells().map((cell) => (
			<TableCell
				key={`compare-products-table-cell-${cell.id}`}
				id={`compare-products-table-cell-${cell.id}`}
				data-testid={`compare-products-table-row-cell-${cell.id}`}
			>
				{flexRender(cell.column.columnDef.cell, cell.getContext())}
			</TableCell>
		))}
	</TableRow>
);
