/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const shippingMultiShipmentTableRowSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		display: 'block',
		borderRadius: 1,
		border: '2px solid',
		borderColor: 'grey.400',
		my: 2,
	},
});
