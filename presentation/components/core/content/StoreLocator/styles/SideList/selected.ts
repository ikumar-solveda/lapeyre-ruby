/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const storeLocatorSideListSelectedSX = (selected: boolean): SxProps<Theme> => ({
	...(selected ? { color: 'primary.main' } : {}),
});
