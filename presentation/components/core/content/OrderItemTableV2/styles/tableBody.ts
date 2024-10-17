/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material/styles';

export const orderItemTableV2TableBodySX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.up('md')]: {
		'> tr': {
			':nth-of-type(odd)': {
				bgcolor: 'grey.100',
			},
		},
	},
});
