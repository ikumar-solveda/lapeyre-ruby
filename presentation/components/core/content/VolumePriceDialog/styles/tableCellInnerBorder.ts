/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const volumePriceDialogTableCellInnerBorderSX: SxProps<Theme> = (theme: Theme) => ({
	[theme.breakpoints.up('md')]: {
		'&:not(:last-of-type)': {
			borderRight: '1px solid',
			borderRightColor: 'border.inactive',
		},
	},
});
