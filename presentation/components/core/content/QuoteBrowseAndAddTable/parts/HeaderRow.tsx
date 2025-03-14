/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { ADD_PRODS_TABLE } from '@/data/constants/quotes';
import type { ProductType } from '@/data/types/Product';
import { flexRender, type HeaderGroup } from '@tanstack/react-table';
import type { FC } from 'react';

export const QuoteBrowseAndAddTableHeaderRow: FC<{
	headerGroup: HeaderGroup<ProductType>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`${ADD_PRODS_TABLE}-head-row-${headerGroup.id}`}
		data-testid={`${ADD_PRODS_TABLE}-head-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${ADD_PRODS_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
				id={`${ADD_PRODS_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${ADD_PRODS_TABLE}-head-row-${headerGroup.id}-cell-${header.id}`}
			>
				{flexRender(header.column.columnDef.header, header.getContext())}
			</TableCell>
		))}
	</TableRow>
);
