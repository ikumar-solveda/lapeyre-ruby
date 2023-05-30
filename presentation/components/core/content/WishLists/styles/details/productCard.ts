/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps } from '@mui/material';

export const wishListDetailsProductCardSX = (selected: boolean): SxProps => ({
	position: 'relative',
	border: selected ? '2px solid' : '1px solid',
	borderColor: selected ? 'primary.main' : 'divider',
});
