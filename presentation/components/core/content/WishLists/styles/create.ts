/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

/** @deprecated use `WishListsV2`*/
export const createSX = (error = false): SxProps => ({
	mb: error ? 3 : 0,
});
