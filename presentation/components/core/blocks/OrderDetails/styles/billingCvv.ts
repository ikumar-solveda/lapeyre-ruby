/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

/** @deprecated  see `OrderDetailsV2` */
export const billingCvvSX: SxProps<Theme> = (theme: Theme) => ({
	mt: 2,
	maxWidth: theme.spacing(25),
});
