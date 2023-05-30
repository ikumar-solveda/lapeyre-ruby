/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material/styles';

export const categoryImageSX: SxProps<Theme> = {
	display: 'block',
	transition: (theme) => theme.transitions.create('transform'),
	'a:hover &': {
		transform: 'scale(0.92)',
		borderRadius: 1,
	},
};
