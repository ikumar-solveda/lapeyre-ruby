/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const accountToolLinkSX = (disabled: boolean): SxProps => ({
	color: 'text.primary',
	display: 'block',
	height: '100%',
	'&:hover': {
		'h6, p': {
			color: disabled ? 'text.disabled' : 'primary.dark',
		},
	},
});
