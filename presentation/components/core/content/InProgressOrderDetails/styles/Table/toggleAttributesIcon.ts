/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2025.
 */

import { SxProps } from '@mui/material';

export const inProgressOrderDetailsTableToggleAttributesIconSX = (open?: boolean): SxProps => ({
	...(open && { transform: 'rotate(90deg)' }),
});
