/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const OverlaySX: SxProps<Theme> = (theme) => ({
	backgroundColor: `${theme.palette.background.paper}${theme.palette.background.transparency}`,
	position: 'absolute',
	bottom: 0,
	height: '70%',
	width: '100%',
});

export const OverlayCancelButtonSX: SxProps<Theme> = (theme) => ({
	backgroundColor: `${theme.palette.background.paper}`,
	fontWeight: '600',
	border: `${theme.spacing(0.25)} solid`,
});

export const OverlayConfirmButtonSX: SxProps<Theme> = (theme) => ({
	backgroundColor: `${theme.palette.background.paper}`,
	fontWeight: '600',
	border: `${theme.spacing(0.25)} solid ${theme.palette.border.alert}`,
	color: `${theme.palette.text.alert}`,
});
