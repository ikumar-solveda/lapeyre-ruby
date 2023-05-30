/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material/styles';
export const footerLinkSX: SxProps<Theme> = {
	color: 'text.primary',
	textDecoration: 'underline',
	fontWeight: 500,
	'&:hover': {
		color: 'primary.main',
	},
};
