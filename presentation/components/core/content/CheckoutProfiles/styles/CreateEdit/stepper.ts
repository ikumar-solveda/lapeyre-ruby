/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const checkoutProfileCreateEditStepperSX: SxProps<Theme> = (theme) => ({
	p: 3,
	[theme.breakpoints.down('md')]: {
		py: 1,
		px: 3,
		display: 'block',
	},
});
