/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const storeLocatorMarkerIconSX =
	(selected?: boolean): SxProps<Theme> =>
	(theme: Theme) => ({
		width: 40,
		height: 50,
		path: {
			fill: selected ? theme.palette.primary.main : (theme.palette as any).button.primary,
		},
	});
