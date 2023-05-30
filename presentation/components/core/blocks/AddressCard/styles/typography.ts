/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material/styles';

// using sx instead of creating a variant because of the type of props that need adjusting
export const addressCardTypographySX: SxProps<Theme> = (theme) => ({
	width: theme.spacing(25),
	paddingRight: theme.spacing(1),
});
