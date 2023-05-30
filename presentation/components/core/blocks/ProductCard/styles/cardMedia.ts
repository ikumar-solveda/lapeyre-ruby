/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const productCardMediaSX: SxProps<Theme> = {
	mt: 2,
	mb: 1,
	mx: 'auto',
	backgroundSize: 'contain',
	position: 'relative',
	height: (theme) => theme.dimensions.productCard.thumbnail + 'px',
};
