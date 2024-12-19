/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const quoteDetailsSubsectionSX: SxProps<Theme> = (theme: Theme) => ({
	p: 1,
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
});
