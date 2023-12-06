/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { ID_KEY } from '@/components/content/RecurringOrderHistory/parts/Table';
import { recurringOrderHistoryTableHeadSX } from '@/components/content/RecurringOrderHistory/styles/tableHead';
import { Order } from '@/data/types/Order';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

export const RecurringOrderHistoryTableHeaderRow: FC<{
	headerGroup: HeaderGroup<Order>;
}> = ({ headerGroup }) => (
	<TableRow
		sx={recurringOrderHistoryTableHeadSX}
		id={`${ID_KEY}-header-row-${headerGroup.id}`}
		data-testid={`${ID_KEY}-header-row-${headerGroup.id}`}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${ID_KEY}-header-row-${headerGroup.id}-cell-${header.id}`}
				id={`${ID_KEY}-header-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${ID_KEY}-header-row-${headerGroup.id}-cell-${header.id}`}
			>
				{flexRender(header.column.columnDef.header, header.getContext())}
			</TableCell>
		))}
	</TableRow>
);
