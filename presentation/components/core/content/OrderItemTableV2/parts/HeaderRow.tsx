/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { orderItemTableV2HeaderCellSX } from '@/components/content/OrderItemTableV2/styles/headerCell';
import { orderItemTableV2HeaderRowSX } from '@/components/content/OrderItemTableV2/styles/headerRow';
import { OrderTableData } from '@/data/types/OrderItemTableV2';
import { TableSortLabel } from '@mui/material';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { ComponentPropsWithRef, FC } from 'react';

export const OrderItemTableV2HeaderRow: FC<
	ComponentPropsWithRef<typeof TableRow> & {
		headerGroup: HeaderGroup<OrderTableData>;
	}
> = ({ headerGroup, id, ...restProps }) => (
	<TableRow id={`${id}-head-row-${headerGroup.id}`} sx={orderItemTableV2HeaderRowSX} {...restProps}>
		{headerGroup.headers.map((header) => (
			<TableCell
				key={`${id}-head-cell-${header.id}`}
				id={`${id}-head-cell-${header.id}`}
				data-testid={`${id}-head-cell-${header.id}`}
				sx={orderItemTableV2HeaderCellSX}
			>
				{header.column.getCanSort() ? (
					<TableSortLabel
						id={`${id}-sort-${header.id}`}
						data-testid={`${id}-sort-${header.id}`}
						active={header.column.getIsSorted() !== false}
						direction={(header.column.getIsSorted() || undefined) as 'desc' | 'asc' | undefined}
						onClick={header.column.getToggleSortingHandler()}
					>
						{flexRender(header.column.columnDef.header, header.getContext())}
					</TableSortLabel>
				) : (
					flexRender(header.column.columnDef.header, header.getContext())
				)}
			</TableCell>
		))}
	</TableRow>
);
