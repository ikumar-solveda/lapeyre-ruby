/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Edge } from '@/data/types/Compare';
import { SxProps } from '@mui/material';

export const catalogEntryListCompareCollectorDrawerContainerSX = (edges: Edge): SxProps => ({
	position: 'absolute',
	top: 'auto',
	bottom: 0,
	...edges,
});
