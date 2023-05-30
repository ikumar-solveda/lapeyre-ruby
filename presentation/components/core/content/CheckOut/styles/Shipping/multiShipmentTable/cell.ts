/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const shippingMultiShipmentTableCellSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		display: 'block',
		p: 1,
		':nth-of-type(odd)': {
			bgcolor: 'grey.100',
		},
	},
});
