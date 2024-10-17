/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023, 2024.
 */

import { SxProps, Theme } from '@mui/material';

export const catalogEntryListCompareCollectorStickyContainerSX: SxProps<Theme> = (theme) => ({
	display: 'inline',
	position: 'sticky',
	top: 'auto',
	bottom: 0,
	zIndex: theme.zIndex.drawer,
});
