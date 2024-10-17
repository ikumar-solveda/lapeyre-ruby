/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const orderTotalSummaryTitleSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.up('md')]: {
		pt: 0.5,
		pb: 2.5,
		mb: 0,
	},
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
});
