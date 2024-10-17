/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { GPSIACTableSkuListTable } from '@/components/content/GroupedProductStoreInventoryAtCartTable/parts/SkuListTable';
import { PRODUCT_INFO_TABLE_PREFIX } from '@/data/constants/storeLocator';
import { Order } from '@/data/types/Order';
import { ProductType } from '@/data/types/Product';
import { StoreDetails } from '@/data/types/Store';
import { flexRender, Row } from '@tanstack/react-table';
import { FC } from 'react';

export const GPSIACTableRow: FC<{
	row: Row<ProductType>;
	order?: Order;
	physicalStore?: StoreDetails;
}> = ({ row, order, physicalStore }) => (
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
				id={`${PRODUCT_INFO_TABLE_PREFIX}-table-row-${row.id}-expanded`}
				expandedContent
			>
				<TableCell colSpan={row.getVisibleCells().length} responsive>
					<GPSIACTableSkuListTable
						product={row.original}
						order={order}
						physicalStore={physicalStore}
					/>
				</TableCell>
			</TableRow>
		) : null}
	</>
);
