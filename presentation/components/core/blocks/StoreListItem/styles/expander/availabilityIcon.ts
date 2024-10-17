/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps } from '@mui/material';

export const storeListItemExpanderAvailabilityIconSX = (inStock = true): SxProps => ({
	color: inStock ? 'green' : 'text.alert',
});
