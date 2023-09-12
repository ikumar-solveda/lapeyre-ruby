/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

// TODO: Remove post 9.1.14
/**
 * @deprecated will remove post 9.1.14
 */
export const shippingMultiShipmentTableColumnTitleSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.up('md')]: {
		display: 'none',
	},
});
