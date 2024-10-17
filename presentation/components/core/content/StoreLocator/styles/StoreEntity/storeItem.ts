/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2024.
 */

import { SxProps, Theme } from '@mui/material';

export const storeLocatorSideEntityStoreItemSX =
	(isSelectedStore: boolean): SxProps<Theme> =>
	(theme: Theme) => ({
		...(isSelectedStore && { backgroundColor: 'background.selectedStore' }),
		width: '100%',
		'&:hover': {
			outline: `0.2em solid ${theme.palette.primary.main}`,
			cursor: 'pointer',
		},
	});
