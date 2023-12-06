/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { recurringOrdersTableHeadSX } from '@/components/content/RecurringOrders/styles/tableHead';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { SubscriptionIBMStoreSummaryItem } from '@/data/Content/RecurringOrders';

export const RecurringOrdersTableHeaderRow: FC<{
	headerGroup: HeaderGroup<SubscriptionIBMStoreSummaryItem>;
}> = ({ headerGroup }) => (
	<TableRow
		sx={recurringOrdersTableHeadSX}
		id={`recurring-order-table-header-row-${headerGroup.id}`}
		data-testid={`recurring-order-table-header-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`recurring-order-table-header-row-${headerGroup.id}-cell-${header.id}`}
				id={`recurring-order-table-header-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`recurring-order-table-header-row-${headerGroup.id}-cell-${header.id}`}
			>
				{flexRender(header.column.columnDef.header, header.getContext())}
			</TableCell>
		))}
	</TableRow>
);
