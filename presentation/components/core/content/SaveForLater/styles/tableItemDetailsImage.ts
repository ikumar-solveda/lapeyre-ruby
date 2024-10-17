/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const saveForLaterTableItemDetailsImageSX: SxProps<Theme> = (theme) => ({
	maxWidth: theme.spacing(12),
	maxHeight: theme.spacing(12),
	[theme.breakpoints.down('md')]: {
		maxHeight: theme.spacing(8),
	},
});
