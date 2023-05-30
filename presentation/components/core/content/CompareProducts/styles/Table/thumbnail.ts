/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const compareProductsTableThumbnailSX: SxProps<Theme> = {
	margin: '20px auto 10px',
	backgroundSize: 'contain',
	position: 'relative',
	height: (theme) => theme.dimensions.productCard.thumbnail + 'px',
};
