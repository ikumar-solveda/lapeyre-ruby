/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { volumePriceDialogTableCellInnerBorderSX } from '@/components/content/VolumePriceDialog/styles/tableCellInnerBorder';
import { VOLUME_PRICE_TABLE_PREFIX } from '@/data/constants/product';
import { RangePriceItem } from '@/data/types/Price';
import { Row, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

type Props = {
	row: Row<RangePriceItem>;
};

export const VolumePriceDialogTableRow: FC<Props> = ({ row }) => (
	<TableRow
		id={`${VOLUME_PRICE_TABLE_PREFIX}-table-row-${row.id}`}
		data-testid={`${VOLUME_PRICE_TABLE_PREFIX}-table-row-${row.id}`}
		responsive
	>
		{row.getVisibleCells().map((cell) => (
			<TableCell
				key={`${VOLUME_PRICE_TABLE_PREFIX}-table-row-${row.id}-cell-${cell.column.id}`}
				id={`${VOLUME_PRICE_TABLE_PREFIX}-table-row-${row.id}-cell-${cell.column.id}`}
				data-testid={`${VOLUME_PRICE_TABLE_PREFIX}-table-row-${row.id}-cell-${cell.column.id}`}
				sx={volumePriceDialogTableCellInnerBorderSX}
				responsive
			>
				{flexRender(cell.column.columnDef.cell, cell.getContext())}
			</TableCell>
		))}
	</TableRow>
);
