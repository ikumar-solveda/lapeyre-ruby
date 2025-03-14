/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import type { SxProps, Theme } from '@mui/material';

export const tableCellResponsiveContentV2MenuSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.up('md')]: {
		display: 'none',
	},
	textAlign: 'end',
});
