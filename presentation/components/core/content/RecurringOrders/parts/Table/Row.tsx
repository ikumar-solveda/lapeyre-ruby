/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { RecurringOrdersContextValues } from '@/components/content/RecurringOrders/parts/Table';
import { RecurringOrdersTableActions } from '@/components/content/RecurringOrders/parts/Table/Actions';
import { RecurringOrdersTableNextOrder } from '@/components/content/RecurringOrders/parts/Table/NextOrder';
import { RecurringOrdersTableOrderId } from '@/components/content/RecurringOrders/parts/Table/OrderId';
import { RecurringOrdersTableOrderSchedule } from '@/components/content/RecurringOrders/parts/Table/OrderSchedule';
import { RecurringOrdersTablePrice } from '@/components/content/RecurringOrders/parts/Table/Price';
import { RecurringOrdersTableStatus } from '@/components/content/RecurringOrders/parts/Table/Status';
import { recurringOrdersTableRowSX } from '@/components/content/RecurringOrders/styles/tableRow';
import { SubscriptionIBMStoreSummaryItem } from '@/data/Content/RecurringOrders';
import { ContentProvider } from '@/data/context/content';
import { Switch } from '@/utils/switch';
import { Row } from '@tanstack/react-table';
import { FC } from 'react';

export const RecurringOrdersTableRow: FC<
	{ row: Row<SubscriptionIBMStoreSummaryItem> } & RecurringOrdersContextValues
> = ({ row, ...ctxValues }) => (
	<ContentProvider value={{ ...ctxValues, subscription: row.original }}>
		<TableRow
			id={`recurring-order-table-row-${row.id}`}
			data-testid={`recurring-order-table-row-${row.id}`}
			sx={recurringOrdersTableRowSX}
			responsive
		>
			{row.getVisibleCells().map((cell) => (
				<TableCell
					key={`recurring-order-table-cell-${cell.id}`} // cell.id is {row.id}_{column.id}
					id={`recurring-order-table-cell-${cell.id}`}
					data-testid={`recurring-order-table-cell-${cell.id}`}
					responsive
				>
					{Switch(cell.column.id)
						.case('order', () => <RecurringOrdersTableOrderId />)
						.case('orderSchedule', () => <RecurringOrdersTableOrderSchedule />)
						.case('nextOrder', () => <RecurringOrdersTableNextOrder />)
						.case('orderStatus', () => <RecurringOrdersTableStatus />)
						.case('orderPrice', () => <RecurringOrdersTablePrice />)
						.case('orderActions', () => <RecurringOrdersTableActions />)
						.defaultTo(() => null)}
				</TableCell>
			))}
		</TableRow>
	</ContentProvider>
);
