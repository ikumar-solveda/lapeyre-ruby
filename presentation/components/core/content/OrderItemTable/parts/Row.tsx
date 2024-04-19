/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { TableData } from '@/components/content/OrderItemTable';
import { OrderItemAvailability } from '@/components/content/OrderItemTable/parts/Availability';
import { OrderItemItemDetails } from '@/components/content/OrderItemTable/parts/ItemDetails';
import { OrderItemItemDetailsCompact } from '@/components/content/OrderItemTable/parts/ItemDetailsCompact';
import { OrderItemItemDetailsMini } from '@/components/content/OrderItemTable/parts/ItemDetailsMini';
import { OrderItemPrice } from '@/components/content/OrderItemTable/parts/Price';
import { OrderItemQuantity } from '@/components/content/OrderItemTable/parts/Quantity';
import { orderItemTableRowSX } from '@/components/content/OrderItemTable/styles/orderItemTableRow';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { Switch } from '@/utils/switch';
import { Row } from '@tanstack/react-table';
import { FC, useContext, useMemo } from 'react';

export const OrderItemTableRow: FC<{ row: Row<TableData> }> = ({ row }) => {
	const { partNumber, contractId, orderItemId } = row.original.itemDetails;
	const { details } = useOrderItemTableRow(partNumber, contractId, orderItemId);
	const { view, readOnly } = useContext(ContentContext) as {
		view: string;
		readOnly: boolean;
	};
	const rowValues = useMemo(
		() => ({
			...row.original,
			details,
		}),
		[details, row.original]
	);
	const { freeGift } = row.original;
	const isReadOnly = freeGift || readOnly;

	return (
		<ContentProvider value={rowValues}>
			<TableRow
				id={`order-item-table-row-${row.id}`}
				data-testid={`order-item-table-row-${row.id}`}
				sx={orderItemTableRowSX}
			>
				{row.getVisibleCells().map((cell) => (
					<TableCell
						key={`order-item-table-cell-${cell.id}`} // cell.id is {row.id}_{column.id}
						id={`order-item-table-cell-${cell.id}`}
						data-testid={`order-item-table-cell-${cell.id}`}
					>
						{Switch(cell.column.id)
							.case('itemDetails', () =>
								view === 'mini' ? (
									<OrderItemItemDetailsMini />
								) : view === 'compact' ? (
									<OrderItemItemDetailsCompact readOnly={isReadOnly} />
								) : (
									<OrderItemItemDetails />
								)
							)
							.case('availability', () => <OrderItemAvailability />)
							.case('quantity', () => <OrderItemQuantity readOnly={isReadOnly} />)
							.case('price', () => <OrderItemPrice />)
							.defaultTo(() => null)}
					</TableCell>
				))}
			</TableRow>
		</ContentProvider>
	);
};
