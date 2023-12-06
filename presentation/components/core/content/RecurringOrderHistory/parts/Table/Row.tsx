/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { ID_KEY } from '@/components/content/RecurringOrderHistory/parts/Table';
import { RecurringOrderHistoryTableOrderId } from '@/components/content/RecurringOrderHistory/parts/Table/OrderId';
import { RecurringOrderHistoryTablePlacedDate } from '@/components/content/RecurringOrderHistory/parts/Table/PlacedDate';
import { RecurringOrderHistoryTableStatus } from '@/components/content/RecurringOrderHistory/parts/Table/Status';
import { RecurringOrderHistoryTableTotalPrice } from '@/components/content/RecurringOrderHistory/parts/Table/TotalPrice';
import { recurringOrderHistoryTableRowSX } from '@/components/content/RecurringOrderHistory/styles/tableRow';
import { ContentProvider } from '@/data/context/content';
import { Order } from '@/data/types/Order';
import { Switch } from '@/utils/switch';
import { Row } from '@tanstack/react-table';
import { FC } from 'react';

export const RecurringOrderHistoryTableRow: FC<{ row: Row<Order> }> = ({ row, ...ctxValues }) => (
	<ContentProvider value={{ ...ctxValues, order: row.original }}>
		<TableRow
			id={`${ID_KEY}-row-${row.id}`}
			data-testid={`${ID_KEY}-row-${row.id}`}
			sx={recurringOrderHistoryTableRowSX}
			responsive
		>
			{row.getVisibleCells().map((cell) => (
				<TableCell
					key={`${ID_KEY}-cell-${cell.id}`} // cell.id is {row.id}_{column.id}
					id={`${ID_KEY}-cell-${cell.id}`}
					data-testid={`${ID_KEY}-cell-${cell.id}`}
					responsive
				>
					{Switch(cell.column.id)
						.case('order', () => <RecurringOrderHistoryTableOrderId />)
						.case('placedDate', () => <RecurringOrderHistoryTablePlacedDate />)
						.case('orderStatus', () => <RecurringOrderHistoryTableStatus />)
						.case('totalProductPrice', () => <RecurringOrderHistoryTableTotalPrice />)
						.defaultTo(() => null)}
				</TableCell>
			))}
		</TableRow>
	</ContentProvider>
);
