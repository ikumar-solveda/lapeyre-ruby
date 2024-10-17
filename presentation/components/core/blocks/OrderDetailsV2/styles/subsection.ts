/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const orderDetailV2SubsectionSX: SxProps<Theme> = (theme: Theme) => ({
	px: 1,
	marginTop: theme.spacing(-1.25),
	[theme.breakpoints.down('sm')]: {
		display: 'none',
	},
});
