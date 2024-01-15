/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */
import { SxProps, Theme } from '@mui/material';

export const recurringOrdersPopUpBorderSX: SxProps<Theme> = (theme: Theme) => ({
	borderTopWidth: 2,
	borderTopColor: theme.palette.primary.main,
	borderTopStyle: 'solid',
});
