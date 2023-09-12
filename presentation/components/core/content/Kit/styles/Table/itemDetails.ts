/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const kitTableItemDetailsSX: SxProps<Theme> = (theme) => ({
	width: 'auto',
	maxHeight: theme.spacing(12),
	[theme.breakpoints.down('md')]: {
		maxHeight: theme.spacing(8),
	},
});
