/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { FC } from 'react';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { TableSortLabel } from '@mui/material';
import { SKU_LIST_TABLE_PREFIX } from '@/data/constants/product';
import { SkuListTableData } from '@/data/types/Product';

export const SkuListTableHeaderRow: FC<{ headerGroup: HeaderGroup<SkuListTableData> }> = ({
	headerGroup,
}) => (
	<TableRow
		id={`${SKU_LIST_TABLE_PREFIX}-table-row-${headerGroup.id}`}
		data-testid={`${SKU_LIST_TABLE_PREFIX}-table-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${SKU_LIST_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				id={`${SKU_LIST_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${SKU_LIST_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
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
