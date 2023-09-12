/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { FC } from 'react';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { Row, flexRender } from '@tanstack/react-table';
import { KitTableData } from '@/data/types/Product';

export const KitTableRow: FC<{ row: Row<KitTableData> }> = ({ row }) => (
	<TableRow responsive expanded={row.getIsExpanded()} expandedContent={!row.getCanExpand()}>
		{row.getVisibleCells().map((cell, i) =>
			row.getCanExpand() || i === 0 ? (
				<TableCell key={i} {...(row.getCanExpand() ? {} : { colSpan: 3 })} responsive>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			) : null
		)}
	</TableRow>
);
