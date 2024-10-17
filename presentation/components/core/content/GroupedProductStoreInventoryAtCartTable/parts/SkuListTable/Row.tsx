/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { GPSIACTableSkuListTableDetailPanel } from '@/components/content/GroupedProductStoreInventoryAtCartTable/parts/SkuListTable/DetailPanel';
import { SKU_LIST_TABLE_PREFIX } from '@/data/constants/product';
import { ProductType } from '@/data/types/Product';
import { Row, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

export const GPSIACTableSkuListTableRow: FC<{ row: Row<ProductType> }> = ({ row }) => (
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
					<GPSIACTableSkuListTableDetailPanel row={row} />
				</TableCell>
			</TableRow>
		) : null}
	</>
);
