/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const oneClickBackdropSX: SxProps<Theme> = (theme) => ({
	color: '#fff',
	zIndex: theme.zIndex.drawer + 1,
});
