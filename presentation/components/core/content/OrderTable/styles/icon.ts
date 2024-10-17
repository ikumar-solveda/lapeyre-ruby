/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material/styles';

export const orderTableIconLabelSX: SxProps<Theme> = (theme) => ({
	pb: 1,
	'div:first-of-type': {
		pr: 1,
		div: {
			backgroundColor: 'unset',
			width: theme.spacing(3),
			height: theme.spacing(3),
		},
	},
	'div:last-of-type': {
		py: 0,
	},
});
