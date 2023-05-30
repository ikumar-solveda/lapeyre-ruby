/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const layoutMainSX = (firstSlotCount: number): SxProps<Theme> => ({
	pt: (theme) => (firstSlotCount === 0 ? theme.dimensions.contentSpacing : 0),
});
