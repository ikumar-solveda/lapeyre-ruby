/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { G_MAPS_Z_INDEX } from '@/data/constants/common';
import { SxProps } from '@mui/material';

export const storeInventoryDialogContainerSX: SxProps = {
	// set z-index as high as but not higher than google-maps widgets' z-index
	zIndex: G_MAPS_Z_INDEX,
};
