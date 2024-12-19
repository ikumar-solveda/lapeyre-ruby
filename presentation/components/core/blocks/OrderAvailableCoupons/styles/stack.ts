/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const orderAvailableCouponsStackSX: SxProps<Theme> = (theme: Theme) => ({
	bgcolor: 'background.selectedStore',
	p: 1,
	borderRadius: theme.spacing(1),
});
