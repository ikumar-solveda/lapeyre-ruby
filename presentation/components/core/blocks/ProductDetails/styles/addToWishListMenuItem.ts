/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const productDetailsAddToWishListMenuItemSX: SxProps<Theme> = {
	'&.MuiMenuItem-root': {
		px: 1,
		'&:not(:last-child)': {
			borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
		},
	},
};
