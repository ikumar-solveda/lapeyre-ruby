/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { FC, useContext, useMemo } from 'react';
import { ContentContext, ContentProvider } from '@/data/context/content';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { TableCell } from '@/components/blocks/Table/TableCell';
import { OrderItemItemDetails } from '@/components/content/OrderItemTable/parts/ItemDetails';
import { OrderItemItemDetailsCompact } from '@/components/content/OrderItemTable/parts/ItemDetailsCompact';
import { OrderItemItemDetailsMini } from '@/components/content/OrderItemTable/parts/ItemDetailsMini';
import { OrderItemAvailability } from '@/components/content/OrderItemTable/parts/Availability';
import { OrderItemQuantity } from '@/components/content/OrderItemTable/parts/Quantity';
import { OrderItemPrice } from '@/components/content/OrderItemTable/parts/Price';
import { orderItemTableRowSX } from '@/components/content/OrderItemTable/styles/orderItemTableRow';
import { OrderItemTableRowProp } from '@/components/content/OrderItemTable/parts/Table';
import { useOrderItemTableRow } from '@/data/Content/OrderItemTable';

import { Switch } from '@/utils/switch';

export const OrderItemTableRow: FC<{ row: OrderItemTableRowProp }> = ({ row }) => {
	const { values, cells, getRowProps } = row;
	const { partNumber } = values.itemDetails;
	const { details } = useOrderItemTableRow(partNumber);
	const { view, readOnly } = useContext(ContentContext) as {
		view: string;
		readOnly: boolean;
	};
	const rowValues = useMemo(
		() => ({
			...values,
			details,
		}),
		[details, values]
	);

	return (
		<ContentProvider value={rowValues}>
			<TableRow {...getRowProps()} sx={orderItemTableRowSX}>
				{cells.map((cell, i) => {
					const {
						column: { id },
					} = cell;

					return (
						<TableCell {...cell.getCellProps()} key={i}>
							{Switch(id)
								.case('itemDetails', () =>
									view === 'mini' ? (
										<OrderItemItemDetailsMini />
									) : view === 'compact' ? (
										<OrderItemItemDetailsCompact readOnly={readOnly} />
									) : (
										<OrderItemItemDetails />
									)
								)
								.case('availability', () => <OrderItemAvailability />)
								.case('quantity', () => <OrderItemQuantity readOnly={readOnly} />)
								.case('price', () => <OrderItemPrice />)
								.defaultTo(() => null)}
						</TableCell>
					);
				})}
			</TableRow>
		</ContentProvider>
	);
};
