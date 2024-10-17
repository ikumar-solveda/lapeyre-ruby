/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

// TODO: Remove post 9.1.14
/**
 * @deprecated will remove post 9.1.14
 */
/** @deprecated */
export const shippingMultiShipmentTableCellSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		// mobile view
		display: 'block',
		p: 1,
		':nth-of-type(odd)': {
			bgcolor: 'grey.100',
		},
	},
});
