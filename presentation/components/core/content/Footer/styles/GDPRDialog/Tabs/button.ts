/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const footerGDPRDialogTabsButtonSX: SxProps<Theme> = (theme: Theme) => ({
	[theme.breakpoints.down('sm')]: {
		width: '100%',
	},
});
