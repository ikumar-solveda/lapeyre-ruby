/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const productDetailsCheckIconSX: SxProps<Theme> = (theme: Theme) => ({
	color: 'primary.main',
	position: 'absolute',
	top: theme.spacing(1),
	right: theme.spacing(1),
});
