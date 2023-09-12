/**
 * Licensed Materials - Property of HCL Technologies Limited.
 * (C) Copyright HCL Technologies Limited 2023.
 */

import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

export const tableCellResponsiveContentLabelSX: SxProps<Theme> = (theme) => ({
	[theme.breakpoints.up('md')]: {
		display: 'none',
	},
	typography: 'overline',
});
