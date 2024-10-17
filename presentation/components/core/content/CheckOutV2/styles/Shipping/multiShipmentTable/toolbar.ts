/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme, alpha } from '@mui/system';

export const checkOutV2ShippingMultiShipmentTableToolbarSX = (
	itemSelected: boolean
): SxProps<Theme> => ({
	pl: { sm: 2 },
	p: { xs: 1, sm: 1 },
	justifyContent: 'space-between',
	flexWrap: 'wrap',
	...(itemSelected && {
		bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
	}),
});
