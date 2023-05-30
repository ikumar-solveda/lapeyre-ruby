/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const headerMiniCartRemoveSX: SxProps<Theme> = {
	cursor: 'pointer',
	opacity: 0.5,
	transition: (theme) => theme.transitions.create('opacity'),
	'&:hover': {
		opacity: 1,
	},
};
