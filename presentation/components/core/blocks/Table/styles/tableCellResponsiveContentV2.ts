/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import type { SxProps, Theme } from '@mui/material';

export const tableCellResponsiveContentV2SX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		alignItems: 'center',
	},
});
