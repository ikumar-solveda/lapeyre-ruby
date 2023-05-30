/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const parallaxLayerBase = (theme: Theme): SxProps => ({
	maxWidth: `${theme.breakpoints.values.lg}px`,
	mx: 'auto',
});

export default parallaxLayerBase;
