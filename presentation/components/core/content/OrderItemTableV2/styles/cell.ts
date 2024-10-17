/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material/styles';

export const orderItemTableV2CellSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		border: 'none',
		':nth-of-type(odd)': {
			bgcolor: 'transparent',
		},
	},
});
