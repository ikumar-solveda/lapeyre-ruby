/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { volumePriceDialogTableCellInnerBorderSX } from '@/components/content/VolumePriceDialog/styles/tableCellInnerBorder';
import { VOLUME_PRICE_TABLE_PREFIX } from '@/data/constants/product';
import { RangePriceItem } from '@/data/types/Price';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { FC } from 'react';

export const VolumePriceDialogTableHeaderRow: FC<{ headerGroup: HeaderGroup<RangePriceItem> }> = ({
	headerGroup,
}) => (
	<TableRow
		id={`${VOLUME_PRICE_TABLE_PREFIX}-table-row-${headerGroup.id}`}
		data-testid={`${VOLUME_PRICE_TABLE_PREFIX}-table-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${VOLUME_PRICE_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				id={`${VOLUME_PRICE_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${VOLUME_PRICE_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				sx={volumePriceDialogTableCellInnerBorderSX}
			>
				{flexRender(header.column.columnDef.header, header.getContext())}
			</TableCell>
		))}
	</TableRow>
);
