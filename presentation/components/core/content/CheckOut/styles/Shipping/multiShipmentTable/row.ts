/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

// TODO: Remove post 9.1.14
/**
 * @deprecated will remove post 9.1.14
 */
export const shippingMultiShipmentTableRowSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		// mobile view
		display: 'block',
		borderRadius: 1,
		border: '2px solid',
		borderColor: 'grey.400',
		my: 2,
	},
});
