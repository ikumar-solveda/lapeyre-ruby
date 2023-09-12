/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

/**
 * @deprecated no longer maintained -- DO NOT USE
 */
export const productDetailsPriceStrikethruSX: SxProps<Theme> = {
	color: (theme) => theme.palette.text.secondary,
	textDecoration: 'line-through',
	fontWeight: '400',
};
