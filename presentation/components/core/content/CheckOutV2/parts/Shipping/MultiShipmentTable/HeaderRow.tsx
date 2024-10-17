/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { checkOutV2ShippingMultiShipmentTableHeaderRowSX } from '@/components/content/CheckOutV2/styles/Shipping/multiShipmentTable/headerRow';
import { MULTIPLE_SHIPMENT_ID_PREFIX, ShippingTableData } from '@/data/constants/shipping';
import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { FC } from 'react';

export const CheckOutV2ShippingMultiShipmentTableHeaderRow: FC<{
	headerGroup: HeaderGroup<ShippingTableData>;
}> = ({ headerGroup }) => (
	<TableRow
		id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-header-row-${headerGroup.id}`}
		sx={checkOutV2ShippingMultiShipmentTableHeaderRowSX}
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
