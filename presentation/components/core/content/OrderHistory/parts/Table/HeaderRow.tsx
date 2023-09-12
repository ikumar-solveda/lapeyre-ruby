/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { orderHistoryTableHeadSX } from '@/components/content/OrderHistory/styles/orderHistoryTableHead';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { OrderOrderSummaryItem } from '@/data/Content/OrderHistory';

export const OrderHistoryTableHeaderRow: FC<{
	headerGroup: HeaderGroup<OrderOrderSummaryItem>;
}> = ({ headerGroup }) => (
	<TableRow
		sx={orderHistoryTableHeadSX}
		id={`order-history-table-header-row-${headerGroup.id}`}
		data-testid={`order-history-table-header-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`order-history-table-header-row-${headerGroup.id}-cell-${header.id}`}
				id={`order-history-table-header-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`order-history-table-header-row-${headerGroup.id}-cell-${header.id}`}
			>
				{flexRender(header.column.columnDef.header, header.getContext())}
			</TableCell>
		))}
	</TableRow>
);
