/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { SxProps } from '@mui/material';

export const requisitionListDetailsTableToggleAttributesIconSX = (open?: boolean): SxProps => ({
	...(open && { transform: 'rotate(90deg)' }),
});
