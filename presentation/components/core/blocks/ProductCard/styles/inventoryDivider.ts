/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const productCardInventoryDividerSX: SxProps<Theme> = (theme: Theme) => ({
	borderColor: 'base.main',
	mr: 0.5,
	height: theme.spacing(2),
	alignSelf: 'center',
});
