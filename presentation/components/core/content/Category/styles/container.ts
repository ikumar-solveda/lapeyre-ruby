/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material/styles';

export const categoryContainerSX: SxProps<Theme> = {
	display: 'block',
	transition: (theme) => theme.transitions.create('color'),
	color: 'text.main',
	'&:hover': {
		boxShadow: 3,
		color: 'primary.main',
	},
};
