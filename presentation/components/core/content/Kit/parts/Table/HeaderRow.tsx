/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { KIT_TABLE_PREFIX } from '@/data/constants/product';
import { FC } from 'react';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { KitTableData } from '@/data/types/Product';
import { TableSortLabel } from '@mui/material';

export const KitTableHeaderRow: FC<{ headerGroup: HeaderGroup<KitTableData> }> = ({
	headerGroup,
}) => (
	<TableRow
		id={`${KIT_TABLE_PREFIX}-table-row-${headerGroup.id}`}
		data-testid={`${KIT_TABLE_PREFIX}-table-row-${headerGroup.id}`}
		responsive
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${KIT_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				id={`${KIT_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${KIT_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				responsive
			>
				{
					<TableSortLabel
						active={header.column.getIsSorted() !== false}
						hideSortIcon={header.column.getIsSorted() === false}
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
