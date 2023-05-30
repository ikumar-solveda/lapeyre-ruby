/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const productImageThumbnailSX: SxProps<Theme> = {
	padding: 0.5,
	border: (theme) => `solid 1px ${theme.palette.grey[300]}`,
	borderRadius: 0.5,
	'&:hover': { cursor: 'pointer' },
};
