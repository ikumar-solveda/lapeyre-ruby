/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const checkOutV2StepLabelSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		py: 1,
		px: 0,
	},
});
