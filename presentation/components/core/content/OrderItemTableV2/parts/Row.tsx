/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { orderItemTableV2CellSX } from '@/components/content/OrderItemTableV2/styles/cell';
import { orderItemTableV2TableRowSX } from '@/components/content/OrderItemTableV2/styles/row';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTableRow';
import { ContentProvider } from '@/data/context/content';
import { OrderTableData } from '@/data/types/OrderItemTableV2';
import { Row, flexRender } from '@tanstack/react-table';
import { ComponentPropsWithRef, FC, useMemo } from 'react';

export const OrderItemTableV2Row: FC<
	ComponentPropsWithRef<typeof TableRow> & {
		row: Row<OrderTableData>;
	}
> = ({ row, id, ...restProps }) => {
	const { partNumber, contractId } = row.original.itemDetails;
	const { details } = useOrderItemTableRow(partNumber, contractId);
	const { freeGift: readOnly } = row.original;
	const rowValues = useMemo(() => ({ details, readOnly }), [details, readOnly]);

	return (
		<ContentProvider value={rowValues}>
			<TableRow
				id={`${id}-row-${row.id}`}
				data-testid={`${id}-row-${row.id}`}
				sx={orderItemTableV2TableRowSX}
				responsive
				expanded={row.getIsExpanded()}
				{...restProps}
			>
				{row.getVisibleCells().map((cell) => (
					<TableCell
						key={`${id}-cell-${cell.id}`}
						id={`${id}-cell-${cell.id}`}
						data-testid={`${id}-cell-${cell.id}`}
						responsive
						sx={orderItemTableV2CellSX}
					>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</TableCell>
				))}
			</TableRow>
		</ContentProvider>
	);
};
