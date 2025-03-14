/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2024.
 */

import { SxProps, Theme } from '@mui/material';

export const storeLocatorSideEntityStoreItemSX = (
	isSelectedStore: boolean,
	isStoreClicked = false
): SxProps<Theme> => ({
	...(isSelectedStore && { backgroundColor: 'background.selectedStore' }),
	...(isStoreClicked && {
		outline: '0.1em solid',
		outlineColor: 'primary.main',
	}),
	width: '100%',
	'&:hover': {
		outline: '0.1em solid',
		outlineColor: 'primary.main',
		cursor: 'pointer',
	},
});
