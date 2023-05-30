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
import { OrderHistoryTableRowType } from '@/components/content/OrderHistory/parts/Table';
import { OrderHistoryTableOrderActions } from '@/components/content/OrderHistory/parts/Table/Actions';

export const OrderHistoryTableRow: FC<{ row: OrderHistoryTableRowType }> = ({ row }) => {
	const { values, cells, getRowProps } = row;

	return (
		<ContentProvider value={values}>
			<TableRow {...getRowProps()} sx={orderHistoryTableRowSX}>
				{cells.map((cell, i) => (
					<TableCell {...cell.getCellProps()} key={i}>
						{Switch(cell.column.id)
							.case('order', () => <OrderHistoryTableOrderId />)
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
};
