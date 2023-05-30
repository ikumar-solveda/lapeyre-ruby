/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const cardSX: SxProps<Theme> = (theme) => ({
	height: '100%',
	border: `1px solid  ${theme.palette.grey[200]}`,
	// instead of adding classes as attrs, use individual SX where necessary
});
