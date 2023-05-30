/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const cardActionsSX: SxProps<Theme> = (theme) => ({
	verticalAlign: 'middle',
	backgroundColor: 'background.main',
	'&.MuiCardActions-spacing > :not(:first-of-type)': {
		// first-child has warning for SSR, use first-of-type. Need to confirm the type of element.
		marginLeft: theme.spacing(2.5),
	},
});
