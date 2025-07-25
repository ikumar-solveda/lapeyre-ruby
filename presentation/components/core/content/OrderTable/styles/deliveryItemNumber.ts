/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps } from '@mui/material';

export const orderTableDeliveryItemNumberSX = (readonly: boolean): SxProps => ({
	...(!readonly && { color: 'primary.main' }),
});
