/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { PRODUCT_INFO_TABLE_PREFIX } from '@/data/constants/storeLocator';
import { ProductType } from '@/data/types/Product';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

export const GPSIACTableHeaderRow: FC<{
	headerGroup: HeaderGroup<ProductType>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`${PRODUCT_INFO_TABLE_PREFIX}-table-row-${headerGroup.id}`}
		data-testid={`${PRODUCT_INFO_TABLE_PREFIX}-table-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${PRODUCT_INFO_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				id={`${PRODUCT_INFO_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${PRODUCT_INFO_TABLE_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
			>
				{flexRender(header.column.columnDef.header, header.getContext())}
			</TableCell>
		))}
	</TableRow>
);
