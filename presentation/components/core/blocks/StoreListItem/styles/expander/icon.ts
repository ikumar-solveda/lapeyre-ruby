/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps } from '@mui/material';

export const storeListItemExpanderIconSX = (open?: boolean): SxProps => ({
	verticalAlign: 'bottom',
	...(open && { transform: 'rotate(180deg)' }),
});
