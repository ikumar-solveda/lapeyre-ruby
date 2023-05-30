/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const productDetailsAddToWishListTypographySX: SxProps<Theme> = (theme) => ({
	whiteSpace: 'nowrap',
	overflowX: 'hidden',
	textOverflow: 'ellipsis',
	maxWidth: theme.spacing(25),
	overflowWrap: 'break-word',
	wordWrap: 'break-word',
	wordBreak: 'break-word',
	color: 'text.primary',
	'&:hover': {
		color: 'primary.main',
	},
});
