/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { TableCellResponsiveContent } from '@/components/blocks/Table/TableCellResponsiveContent';
import { useLocalization } from '@/data/Localization';
import { ShippingTableData } from '@/data/constants/shipping';
import { Typography } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { FC } from 'react';

export const CheckOutV2ShippingMultiShipmentTableQuantity: FC<
	CellContext<ShippingTableData, { quantity: number }>
> = ({ getValue }) => {
	const multipleShipmentTableNLS = useLocalization('MultipleShipmentTable');
	const { quantity } = getValue();
	return (
		<TableCellResponsiveContent
			label={
				<Typography variant="overline">{multipleShipmentTableNLS.Labels.Quantity.t()}</Typography>
			}
		>
			<Typography variant="body1">{quantity}</Typography>
		</TableCellResponsiveContent>
	);
};
