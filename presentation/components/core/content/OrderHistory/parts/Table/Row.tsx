/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC } from 'react';
import { ContentProvider } from '@/data/context/content';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { Switch } from '@/utils/switch';
import { orderHistoryTableRowSX } from '@/components/content/OrderHistory/styles/orderHistoryTableRow';
import { OrderHistoryTablePrice } from '@/components/content/OrderHistory/parts/Table/Price';
import { OrderHistoryTableStatus } from '@/components/content/OrderHistory/parts/Table/Status';
import { OrderHistoryTableDate } from '@/components/content/OrderHistory/parts/Table/Date';
import { OrderHistoryTableOrderId } from '@/components/content/OrderHistory/parts/Table/OrderId';
import { OrderHistoryContextValues } from '@/components/content/OrderHistory/parts/Table';
import { OrderHistoryTableOrderActions } from '@/components/content/OrderHistory/parts/Table/Actions';
import { OrderOrderSummaryItem } from '@/data/Content/OrderHistory';
import { Row } from '@tanstack/react-table';
import { OrderHistoryTablePurchaseOrder } from '@/components/content/OrderHistory/parts/Table/PurchaseOrder';

export const OrderHistoryTableRow: FC<
	{ row: Row<OrderOrderSummaryItem> } & OrderHistoryContextValues
> = ({ row, ...ctxValues }) => (
	<ContentProvider value={{ ...ctxValues, order: row.original }}>
		<TableRow
			id={`order-history-table-row-${row.id}`}
			data-testid={`order-hisotry-table-row-${row.id}`}
			sx={orderHistoryTableRowSX}
			responsive
		>
			{row.getVisibleCells().map((cell) => (
				<TableCell
					key={`order-history-table-cell-${cell.id}`} // cell.id is {row.id}_{column.id}
					id={`order-history-table-cell-${cell.id}`}
					data-testid={`order-history-table-cell-${cell.id}`}
					responsive
				>
					{Switch(cell.column.id)
						.case('order', () => <OrderHistoryTableOrderId />)
						.case('purchaseOrder', () => <OrderHistoryTablePurchaseOrder />)
						.case('orderDate', () => <OrderHistoryTableDate />)
						.case('orderStatus', () => <OrderHistoryTableStatus />)
						.case('orderPrice', () => <OrderHistoryTablePrice />)
						.case('orderActions', () => <OrderHistoryTableOrderActions />)
						.defaultTo(() => null)}
				</TableCell>
			))}
		</TableRow>
	</ContentProvider>
);
