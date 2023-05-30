/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { shippingMultiShipmentTableColumnTitleSX } from '@/components/content/CheckOut/styles/Shipping/multiShipmentTable/columnTitle';
import { useLocalization } from '@/data/Localization';
import { Grid, Typography } from '@mui/material';
import { FC } from 'react';

export const Quantity: FC<{ value: { quantity: number } }> = ({ value: { quantity } }) => {
	const multipleShipmentTableNLS = useLocalization('MultipleShipmentTable');
	return (
		<Grid container>
			<Grid item xs={6} sx={shippingMultiShipmentTableColumnTitleSX}>
				<Typography variant="overline">{multipleShipmentTableNLS.Labels.Quantity.t()}</Typography>
			</Grid>
			<Grid item xs={6} md={12}>
				<Typography variant="body1">{quantity}</Typography>
			</Grid>
		</Grid>
	);
};
