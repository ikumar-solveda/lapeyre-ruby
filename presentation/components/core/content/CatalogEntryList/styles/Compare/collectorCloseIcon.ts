/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const catalogEntryListCompareCollectorCloseIconSX: SxProps<Theme> = (theme) => ({
	position: 'absolute',
	right: theme.spacing(1),
	top: theme.spacing(1),
	p: 0,
	width: theme.spacing(3),
	height: theme.spacing(3),
	color: 'text.secondary',
	'&:hover': {
		color: 'primary.dark',
	},
});
