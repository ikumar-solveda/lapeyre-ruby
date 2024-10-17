/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { useCheckOut } from '@/data/Content/CheckOut';
import { useShipping } from '@/data/Content/Shipping';
import { MULTIPLE_SHIPMENT_ID_PREFIX, ShippingTableData } from '@/data/constants/shipping';
import { ContentContext } from '@/data/context/content';
import { Row, flexRender } from '@tanstack/react-table';
import { Dispatch, FC, SetStateAction, useContext } from 'react';

/** @deprecated */
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
			key={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-row-${row.id}`}
			selected={selectedItemIds.includes(row.id)}
			aria-checked={selectedItemIds.includes(row.id)}
			id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-row-${row.id}`}
			data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-row-${row.id}`}
			responsive
		>
			{row.getVisibleCells().map((cell) => (
				<TableCell
					key={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-cell-${cell.id}`} // cell.id is {row.id}_{column.id}
					id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-cell-${cell.id}`}
					data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-table-cell-${cell.id}`}
					responsive
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
	);
};
