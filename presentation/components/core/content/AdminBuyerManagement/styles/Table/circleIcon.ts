/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { SxProps, Theme } from '@mui/material';

export const adminBuyerManagementTableCircleIconSX = (enabled = false): SxProps<Theme> => ({
	color: enabled ? 'success.main' : 'error.main',
	fontSize: 12,
	marginRight: 1,
});
