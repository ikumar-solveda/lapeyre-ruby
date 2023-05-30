/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

// mostly for styling content-based "contained" button variants
export default {
	backgroundColor: 'button.primary',
	color: 'button.contrastText',

	'&:hover': {
		backgroundColor: 'button.primaryHover',
		color: 'button.contrastText',
	},
} as SxProps;
