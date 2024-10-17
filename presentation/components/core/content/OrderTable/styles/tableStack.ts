/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const orderTableStackSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.up('md')]: {
		boxShadow: 'none',
		border: 'none',
		padding: 0,
	},
	boxShadow: theme.shadows[2],
	padding: 2,
});
