/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { Edge } from '@/data/types/Compare';
import { SxProps } from '@mui/material';

export const catalogEntryListCompareCollectorDrawerContainerSX = (_edges?: Edge): SxProps => ({
	// edge is not used in this function, leave it for backward compatibility of the function signature.
	position: 'fixed',
	top: 'auto',
	bottom: 0,
	left: 0,
	width: '100vw',
});
