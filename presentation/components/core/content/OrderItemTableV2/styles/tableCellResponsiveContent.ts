/*
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2024.
 */

import { SxProps, Theme } from '@mui/material/styles';

export const orderItemTableV2TableCellResponsiveContentSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.down('md')]: {
		'> :first-of-type': { display: 'none' },
	},
});
