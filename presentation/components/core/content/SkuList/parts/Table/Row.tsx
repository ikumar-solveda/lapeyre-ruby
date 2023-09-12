/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { FC } from 'react';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { Row, flexRender } from '@tanstack/react-table';
import { SkuListTableDetailPanel } from '@/components/content/SkuList/parts/Table/DetailPanel';
import { SKU_LIST_TABLE_PREFIX } from '@/data/constants/product';
import { SkuListTableData } from '@/data/types/Product';

export const SkuListTableRow: FC<{ row: Row<SkuListTableData> }> = ({ row }) => (
	<>
		<TableRow expanded={row.getIsExpanded()} responsive>
			{row.getVisibleCells().map((cell, i) => (
				<TableCell key={i} responsive>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
		{row.getIsExpanded() ? (
			<TableRow
				responsive
				id={`${SKU_LIST_TABLE_PREFIX}-table-row-${row.id}-expanded`}
				expandedContent
			>
				<TableCell colSpan={row.getVisibleCells().length} responsive>
					<SkuListTableDetailPanel row={row} />
				</TableCell>
			</TableRow>
		) : null}
	</>
);
