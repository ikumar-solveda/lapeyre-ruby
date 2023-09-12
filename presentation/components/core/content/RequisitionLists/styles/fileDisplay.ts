/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { SxProps, Theme } from '@mui/material';

export const requisitionListsFileDisplaySX: SxProps<Theme> = (theme: Theme) => ({
	maxHeight: theme.spacing(6),
	overflowY: 'auto',
});
