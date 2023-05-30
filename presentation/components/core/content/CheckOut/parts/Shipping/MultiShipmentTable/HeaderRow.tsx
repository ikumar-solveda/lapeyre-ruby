/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { TableCell } from '@/components/blocks/Table/TableCell';
import { TableRow } from '@/components/blocks/Table/TableRow';
import { shippingMultiShipmentTableHeaderRowSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/headerRow';
import { MULTIPLE_SHIPMENT_ID_PREFIX, ShippingTableData } from '@/data/constants/shipping';
import { FC } from 'react';
import { HeaderGroup } from 'react-table';

export const ShippingMultiShipmentTableHeaderRow: FC<{
	headerGroup: HeaderGroup<ShippingTableData>;
}> = ({ headerGroup }) => (
	<TableRow
		{...headerGroup.getHeaderGroupProps()}
		id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-header-row-${headerGroup.id}`}
		sx={shippingMultiShipmentTableHeaderRowSX}
	>
		{headerGroup.headers.map((column) => (
			<TableCell
				{...column.getHeaderProps()}
				key={`${MULTIPLE_SHIPMENT_ID_PREFIX}-header-row-${headerGroup.id}-cell-${column.id}`}
				id={`${MULTIPLE_SHIPMENT_ID_PREFIX}-header-row-${headerGroup.id}-cell-${column.id}`}
				data-testid={`${MULTIPLE_SHIPMENT_ID_PREFIX}-header-row-${headerGroup.id}-cell-${column.id}`}
			>
				{column.render('Header')}
			</TableCell>
		))}
	</TableRow>
);
