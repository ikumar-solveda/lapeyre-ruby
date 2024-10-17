/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { shippingMultiShipmentTableHeaderRowSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/headerRow';
import { MULTIPLE_SHIPMENT_ID_PREFIX, ShippingTableData } from '@/data/constants/shipping';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

/** @deprecated */
export const ShippingMultiShipmentTableHeaderRow: FC<{
	headerGroup: HeaderGroup<ShippingTableData>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-header-row-${headerGroup.id}`}
		sx={shippingMultiShipmentTableHeaderRowSX}
	>
		{headerGroup.headers.map((header) => (
			<TableCell
				colSpan={header.colSpan}
				key={`${MULTIPLE_SHIPMENT_ID_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
				data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-header-row-${headerGroup.id}-cell-${header.id}`}
			>
				{flexRender(header.column.columnDef.header, header.getContext())}
			</TableCell>
		))}
	</TableRow>
);
