/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const orderTotalSummaryTitleDividerSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.up('md')]: {
		mx: -2,
		mb: 2,
	},
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
});
