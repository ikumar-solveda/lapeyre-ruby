/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023-2025.
 */
import type { SxProps, Theme } from '@mui/material';

/**
 * @deprecated this export will be removed in future versions
 */
export const recurringOrdersPopUpBorderSX: SxProps<Theme> = (theme: Theme) => ({
	borderTopWidth: 2,
	borderTopColor: theme.palette.primary.main,
	borderTopStyle: 'solid',
});
