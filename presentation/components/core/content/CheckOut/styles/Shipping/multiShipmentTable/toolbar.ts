/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme, alpha } from '@mui/material';

export const shippingMultiShipmentTableToolbarSX = (itemSelected: boolean): SxProps<Theme> => ({
	pl: { sm: 2 },
	p: { xs: 1, sm: 1 },
	justifyContent: 'space-between',
	flexWrap: 'wrap',
	...(itemSelected && {
		bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
	}),
});
