/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

/** @deprecated  see `OrderDetailsV2` */
export const orderDetailSubsectionSX: SxProps<Theme> = (theme: Theme) => ({
	px: 1,
	marginTop: theme.spacing(-1.25),
	[theme.breakpoints.down('sm')]: {
		display: 'none',
	},
});
