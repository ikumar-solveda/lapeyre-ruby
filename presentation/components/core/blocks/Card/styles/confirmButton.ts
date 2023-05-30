/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const confirmButtonSX: SxProps<Theme> = (theme: Theme) => ({
	backgroundColor: 'background.paper',
	fontWeight: 600,
	color: 'text.alert',
	border: `${theme.spacing(0.25)} solid ${theme.palette.border.alert}`,
	'&:hover': {
		border: `${theme.spacing(0.25)} solid ${theme.palette.border.alert}`,
		color: 'text.alert',
	},
});
