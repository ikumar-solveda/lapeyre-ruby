/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import type { SxProps, Theme } from '@mui/material';

export const quoteDetailsContentGridSX: SxProps<Theme> = (theme: Theme) => ({
	[theme.breakpoints.down('md')]: {
		'> .MuiGrid-item': {
			':last-of-type': {
				order: -1,
			},
		},
	},
});
