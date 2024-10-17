/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps } from '@mui/material';

export const gpsiacTableCollapsibleIconSX = (open?: boolean): SxProps => ({
	...(open && { transform: 'rotate(90deg)' }),
});
