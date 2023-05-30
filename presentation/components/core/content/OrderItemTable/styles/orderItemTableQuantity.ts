/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const orderItemTableQuantitySX: SxProps<Theme> = () => ({
	'.MuiSvgIcon-root': {
		'&:hover': {
			color: 'primary.main',
		},
	},
});
