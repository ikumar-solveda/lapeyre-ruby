/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { SxProps } from '@mui/material';

export const skuListTableStockSX = (inStock: boolean): SxProps => ({
	color: inStock ? 'green' : 'crimson',
});
