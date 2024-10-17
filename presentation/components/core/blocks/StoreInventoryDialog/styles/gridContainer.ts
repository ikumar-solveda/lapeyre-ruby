/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const storeInventoryDialogGridContainerSX: SxProps<Theme> = (theme: Theme) => ({
	[theme.breakpoints.up('md')]: {
		height: '740px',
	},
});
