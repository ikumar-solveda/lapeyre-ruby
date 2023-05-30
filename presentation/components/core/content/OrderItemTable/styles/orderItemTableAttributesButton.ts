/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited  2023.
 */

import { SxProps, Theme } from '@mui/material';

export const orderItemTableAttributesButtonSX: SxProps<Theme> = (theme) => ({
	py: '0 !important',
	paddingLeft: '4px !important',
	paddingRight: '4px !important',
	my: 1,

	span: {
		marginRight: theme.spacing(0.5),
	},
});
