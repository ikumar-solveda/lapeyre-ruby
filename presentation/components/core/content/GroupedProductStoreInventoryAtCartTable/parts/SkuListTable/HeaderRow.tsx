/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { ORDER_SKU_LIST_TABLE_PREFIX } from '@/data/constants/storeLocator';
import { ProductType } from '@/data/types/Product';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

export const GPSIACTableSkuListTableHeaderRow: FC<{
	headerGroup: HeaderGroup<ProductType>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`${ORDER_SKU_LIST_TABLE_PREFIX}-table-row-${headerGroup.id}`}
		data-testid={`${ORDER_SKU_LIST_TABLE_PREFIX}-table-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${ORDER_SKU_LIST_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				id={`${ORDER_SKU_LIST_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${ORDER_SKU_LIST_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
			>
				{flexRender(header.column.columnDef.header, header.getContext())}
			</TableCell>
		))}
	</TableRow>
);
