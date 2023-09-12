/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { BUNDLE_TABLE_PREFIX } from '@/data/constants/product';
import { BundleTableRowData } from '@/data/types/Product';
import { TableSortLabel } from '@mui/material';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

export const BundleTableHeaderRow: FC<{ headerGroup: HeaderGroup<BundleTableRowData> }> = ({
	headerGroup,
}) => (
	<TableRow
		id={`${BUNDLE_TABLE_PREFIX}-table-row-${headerGroup.id}`}
		data-testid={`${BUNDLE_TABLE_PREFIX}-table-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${BUNDLE_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				id={`${BUNDLE_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${BUNDLE_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
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
