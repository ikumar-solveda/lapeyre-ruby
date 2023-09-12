/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { SxProps, Theme } from '@mui/material';

export const loginRegistrationB2BFormIconContainerSX: SxProps<Theme> = (theme) => ({
	position: 'relative',
	flex: 'none',
	backgroundColor: 'action.hover',
	width: theme.spacing(7),
	height: theme.spacing(7),
	borderRadius: '50%',
	textAlign: 'center',
});
