/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const cancelButtonSX: SxProps<Theme> = (theme) => ({
	backgroundColor: theme.palette.background.paper,
	fontWeight: 600,
	borderWidth: theme.spacing(0.25),
	'&:hover': {
		borderWidth: theme.spacing(0.25),
	},
});
