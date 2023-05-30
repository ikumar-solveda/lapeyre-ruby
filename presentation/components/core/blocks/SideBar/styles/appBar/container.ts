/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material/styles';

export const sidebarAppBarContainerSX: SxProps<Theme> = {
	top: 'auto',
	bottom: 0,
	height: (theme) => theme.spacing(6),
	lineHeight: (theme) => theme.spacing(6),
	py: 0,
	px: 2,
	boxShadow: 2,
};
