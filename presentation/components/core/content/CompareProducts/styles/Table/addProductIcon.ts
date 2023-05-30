/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const compareProductsTableAddProductIconSX: SxProps<Theme> = (theme) => ({
	backgroundColor: 'primary.main',
	color: 'white',
	width: theme.spacing(5),
	height: theme.spacing(5),
	borderRadius: theme.spacing(2.5),
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	opacity: 0.75,
});
