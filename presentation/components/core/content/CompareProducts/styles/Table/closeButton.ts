/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const compareProductsTableCloseButtonSX: SxProps = {
	position: 'absolute',
	right: 0,
	top: 0,
	padding: 0,
	color: 'text.secondary',

	'&:hover': {
		color: 'primary.dark',
	},
};
