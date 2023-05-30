/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const orderItemTablePriceSX: SxProps<Theme> = (theme) => ({
	color: theme.palette.text.disabled,
	textDecoration: 'line-through',
});
