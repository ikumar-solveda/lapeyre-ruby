/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import type { SxProps, Theme } from '@mui/material';

export const tableContainerResponsiveSX: SxProps<Theme> = (theme: Theme) => ({
	[theme.breakpoints.down('md')]: {
		backgroundColor: 'transparent',
		border: 0,
	},
});
