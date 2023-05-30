/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const layoutGridHeightSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.up('xs')]: {
		height: '100%',
	},
	[theme.breakpoints.up('md')]: {
		height: 'auto',
	},
});
