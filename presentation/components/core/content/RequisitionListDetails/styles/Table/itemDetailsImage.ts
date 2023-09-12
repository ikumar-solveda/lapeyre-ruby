/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { SxProps, Theme } from '@mui/material';

export const requisitionListDetailsTableItemDetailsImageSX: SxProps<Theme> = (theme) => ({
	width: 'auto',
	maxWidth: 'unset',
	maxHeight: theme.spacing(12),
	[theme.breakpoints.down('md')]: {
		maxHeight: theme.spacing(10),
	},
});
