/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const storeLocatorMarkerIconSX: SxProps<Theme> = (theme: Theme) => ({
	width: 30,
	height: 39,
	path: {
		fill: theme?.palette?.primary.main,
	},
});
