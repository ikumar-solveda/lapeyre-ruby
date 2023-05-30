/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { shippingMultiShipmentTableCellSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/cell';
import { shippingMultiShipmentTableRowSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/row';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { MULTIPLE_SHIPMENT_ID_PREFIX, ShippingTableData } from '@/data/constants/shipping';
import { ContentContext } from '@/data/context/content';
import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { Row } from 'react-table';

export const ShippingMultiShipmentTableRow: FC<{
	row: Row<ShippingTableData>;
}> = ({ row }) => {
	const { selectedItemIds } = useContext(ContentContext) as ReturnType<typeof useCheckOut> &
		ReturnType<typeof useShipping> & {
			selectedItemIds: string[];
			setSelectedItemIds: Dispatch<SetStateAction<string[]>>;
		};
	return (
		<TableRow
			{...row.getRowProps()}
			selected={selectedItemIds.includes(row.original.orderItemId)}
			aria-checked={selectedItemIds.includes(row.original.orderItemId)}
			id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-row-${row.original.orderItemId}`}
			data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-row-${row.original.orderItemId}`}
			sx={shippingMultiShipmentTableRowSX}
		>
			{row.cells.map((cell) => (
				<TableCell
					{...cell.getCellProps()}
					key={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-row-${row.original.orderItemId}-cell-${cell.column.id}`}
					id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-row-${row.original.orderItemId}-cell-${cell.column.id}`}
					data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-row-${row.original.orderItemId}-cell-${cell.column.id}`}
					sx={shippingMultiShipmentTableCellSX}
				>
					{cell.render('Cell')}
				</TableCell>
			))}
		</TableRow>
	);
};
